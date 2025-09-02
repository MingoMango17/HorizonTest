import React, { useState } from "react";

interface TaskProps {
	task: {
		title: string;
		description: string;
		completed: boolean;
	};
	handleCompleteTask: () => void;
}

const editSVG = (
	<svg
		className="w-6 h-6 text-gray-800 dark:text-[#CDCDCD]"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
		/>
	</svg>
);

const trashSVG = (
	<svg
		className="w-6 h-6 text-gray-800 dark:text-[#CDCDCD]"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
		/>
	</svg>
);

const TaskComponent: React.FC<TaskProps> = ({ task, handleCompleteTask }) => {
	const { title, description, completed } = task;
	const handleChange = () => {
		handleCompleteTask();
	};

	return (
		<div className="flex w-full justify-between">
			<div className="flex space-x-4">
				<input
					type="checkbox"
					checked={completed}
					onChange={handleChange}
					className="sr-only"
				/>
				<div
					onClick={handleChange}
					className={`w-6 h-6 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${
						completed
							? "bg-[#6C63FF] border-none"
							: "bg-transparent border-[#6C63FF]"
					}`}
				>
					{completed && (
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					)}
				</div>
				<div className={completed ? `line-through` : ""}>{title}</div>
			</div>
			<div className="flex">
				<button className="cursor-pointer">{editSVG}</button>
				<button className="cursor-pointer">{trashSVG}</button>
			</div>
		</div>
	);
};

export default TaskComponent;
