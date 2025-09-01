import React, { useState } from "react";
import Dropdown from "./Dropdown";
import TaskComponent from "./TaskComponent";
import AddTaskModal from "./AddTaskModal";

const taskTestData = [
	{
		title: "Fix navbar responsive design",
		description:
			"Update CSS media queries to handle mobile breakpoints correctly",
		completed: false,
	},
	{
		title: "Write unit tests for user authentication",
		description:
			"Create comprehensive test coverage for login, logout, and token validation",
		completed: true,
	},
	{
		title: "Update project documentation",
		description:
			"Revise README file with latest installation instructions and API endpoints",
		completed: false,
	},
	{
		title: "Optimize database queries",
		description:
			"Review and improve slow-performing queries in the analytics dashboard",
		completed: true,
	},
	{
		title: "Implement dark mode toggle",
		description:
			"Add user preference for dark/light theme with persistent storage",
		completed: false,
	},
];

const MainPage = () => {
	const [filter, setFilter] = useState<string>("All");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleAddTask = () => {
		console.log("Add new task clicked");
		setIsModalOpen(true);
	};

	const handleAddNewTask = () => {
		// 
	}

	return (
		<div className="flex flex-col mt-32 justify-center items-center">
			<div className="w-full max-w-3xl mx-auto flex justify-center items-center space-x-6 px-4 relative">
				<input
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
				{taskTestData &&
					taskTestData.map((task, idx) => (
						<div key={idx} className="w-full space-y-6">
							<TaskComponent task={task} />
							{idx !== taskTestData.length - 1 && (
								<hr className="border-[#6C63FF]" />
							)}
						</div>
					))}
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
