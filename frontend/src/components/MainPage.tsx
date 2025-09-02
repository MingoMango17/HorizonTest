import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import TaskComponent from "./TaskComponent";
import AddTaskModal from "./AddTaskModal";
import { useAuth } from "@/providers/AuthProvider";

const taskTestData = [
	{
		id: 1,
		title: "Fix navbar responsive design",
		description:
			"Update CSS media queries to handle mobile breakpoints correctly",
		completed: false,
	},
	{
		id: 2,
		title: "Write unit tests for user authentication",
		description:
			"Create comprehensive test coverage for login, logout, and token validation",
		completed: true,
	},
	{
		id: 3,
		title: "Update project documentation",
		description:
			"Revise README file with latest installation instructions and API endpoints",
		completed: false,
	},
	{
		id: 4,
		title: "Optimize database queries",
		description:
			"Review and improve slow-performing queries in the analytics dashboard",
		completed: true,
	},
	{
		id: 5,
		title: "Implement dark mode toggle",
		description:
			"Add user preference for dark/light theme with persistent storage",
		completed: false,
	},
];

interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

const MainPage = () => {
	const [tasks, setTasks] = useState<Task[]>(taskTestData);
	const [filter, setFilter] = useState<string>("All");

	const [search, setSearch] = useState<string>("");
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleCompleteTask = (taskId: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === taskId
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	const handleAddTask = () => {
		console.log("Add new task clicked");
		setIsModalOpen(true);
	};

	const handleAddNewTask = () => {
		//
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
				{tasksToShow.map((task, idx) => (
					<div key={task.id} className="w-full space-y-6">
						<TaskComponent
							task={task}
							handleCompleteTask={() =>
								handleCompleteTask(task.id)
							}
						/>
						{idx !== tasksToShow.length - 1 && (
							<hr className="border-[#6C63FF]" />
						)}
					</div>
				))}
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
			/>
		</div>
	);
};

export default MainPage;
