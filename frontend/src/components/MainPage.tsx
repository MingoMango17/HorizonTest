import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import TaskComponent from "./TaskComponent";
import AddTaskModal from "./AddTaskModal";
import { useAuth } from "@/providers/AuthProvider";
import djangoAPI from "@/utils/axios";

interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

const MainPage = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filter, setFilter] = useState<string>("All");
	const [search, setSearch] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setEditingTask(null);
	};

	const handleCompleteTask = async (taskId: number) => {
		try {
			const taskToUpdate = tasks.find((task) => task.id === taskId);
			if (!taskToUpdate) return;

			const response = await djangoAPI.put(`api/v1/task/${taskId}/`, {
				...taskToUpdate,
				completed: !taskToUpdate.completed,
			});

			setTasks((prev) =>
				prev.map((task) => (task.id === taskId ? response.data : task))
			);
		} catch (error) {
			console.error("Error updating task completion:", error);
		}
	};

	const handleEditTask = (task: Task) => {
		setEditingTask(task);
		setIsModalOpen(true);
	};

	const handleDeleteTask = async (taskId: number) => {
		try {
			await djangoAPI.delete(`api/v1/task/${taskId}/`);

			setTasks((prev) => prev.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	useEffect(() => {
		const getTasks = async () => {
			try {
				setLoading(true);
				setError(null);
				const request = await djangoAPI.get("api/v1/task/");
				const data = request.data;
				setTasks(data);
			} catch (error) {
				console.error("Error fetching tasks:", error);
				setError("Failed to load tasks. Please try again.");
			} finally {
				setLoading(false);
			}
		};
		getTasks();
	}, []);

	const handleAddTask = () => {
		console.log("Add new task clicked");
		setEditingTask(null);
		setIsModalOpen(true);
	};

	const handleAddNewTask = async (taskData: {
		title: string;
		description: string;
	}) => {
		try {
			if (editingTask) {
				// Update existing task
				const response = await djangoAPI.put(
					`api/v1/task/${editingTask.id}/`,
					{
						title: taskData.title,
						description: taskData.description,
						completed: editingTask.completed,
					}
				);

				setTasks((prev) =>
					prev.map((task) =>
						task.id === editingTask.id ? response.data : task
					)
				);
			} else {
				const response = await djangoAPI.post("api/v1/task/", {
					title: taskData.title,
					description: taskData.description,
					completed: false,
				});

				setTasks((prev) => [...prev, response.data]);
			}
			handleModalClose();
		} catch (error) {
			console.error("Error saving task:", error);
		}
	};

	const tasksToShow = useMemo(() => {
		let filteredTasks = tasks;

		switch (filter) {
			case "Pending":
				filteredTasks = tasks.filter((task) => !task.completed);
				break;
			case "Done":
				filteredTasks = tasks.filter((task) => task.completed);
				break;
			case "All":
			default:
				filteredTasks = tasks;
				break;
		}

		if (search.trim() !== "") {
			filteredTasks = filteredTasks.filter(
				(task) =>
					task.title.toLowerCase().includes(search.toLowerCase()) ||
					task.description
						.toLowerCase()
						.includes(search.toLowerCase())
			);
		}

		return filteredTasks;
	}, [filter, tasks, search]);

	const { logout } = useAuth();
	const handleLogout = () => {
		logout();
	};

	return (
		<div className="flex flex-col mt-32 justify-center items-center">
			<div className="w-full max-w-3xl mx-auto flex justify-center items-center space-x-6 px-4 relative">
				<input
					value={search}
					onChange={handleSearch}
					type="text"
					className="w-full border border-white rounded-lg px-4 py-2"
					placeholder="Search..."
				/>
				<Dropdown
					options={["All", "Pending", "Done"]}
					selected={filter}
					handleSelect={setFilter}
					dropdownStyle={
						"w-24 bg-[#6C63FF] px-3 py-2 rounded-lg hover:bg-[#4941CC]"
					}
				/>
			</div>

			<div className="flex flex-col space-y-6 mt-10 w-full max-w-xl mx-auto items-center justify-center">
				{loading ? (
					<div className="text-white text-center">
						Loading tasks...
					</div>
				) : error ? (
					<div className="text-red-500 text-center">{error}</div>
				) : tasksToShow.length === 0 ? (
					<div className="text-gray-400 text-center">
						No tasks found
					</div>
				) : (
					tasksToShow.map((task, idx) => (
						<div key={task.id} className="w-full space-y-6">
							<TaskComponent
								task={task}
								handleCompleteTask={() =>
									handleCompleteTask(task.id)
								}
								handleEditTask={() => handleEditTask(task)}
								handleDeleteTask={() =>
									handleDeleteTask(task.id)
								}
							/>
							{idx !== tasksToShow.length - 1 && (
								<hr className="border-[#6C63FF]" />
							)}
						</div>
					))
				)}
			</div>

			<div className="fixed top-8 w-full max-w-3xl mx-auto px-4">
				<div className="flex justify-end">
					<button
						onClick={handleLogout}
						className="bg-red-600 px-2 py-1 rounded-lg"
					>
						Logout
					</button>
				</div>
			</div>

			<div className="fixed bottom-8 w-full max-w-3xl mx-auto px-4">
				<div className="flex justify-end">
					<button
						onClick={handleAddTask}
						className="w-12 h-12 bg-[#6C63FF] hover:bg-[#4941CC] rounded-full flex items-center justify-center text-white text-2xl font-light transition-colors duration-200 shadow-lg"
					>
						+
					</button>
				</div>
			</div>

			<AddTaskModal
				isOpen={isModalOpen}
				onClose={handleModalClose}
				onAddTask={handleAddNewTask}
				editingTask={editingTask}
			/>
		</div>
	);
};

export default MainPage;
