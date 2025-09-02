import React, { useState, useEffect } from "react";

interface Task {
	id?: number;
	title: string;
	description: string;
	completed: boolean;
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onAddTask: (task: { title: string; description: string }) => void;
	editingTask?: Task | null;
}

const AddTaskModal: React.FC<Props> = ({
	isOpen,
	onClose,
	onAddTask,
	editingTask,
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (editingTask) {
			setTitle(editingTask.title);
			setDescription(editingTask.description);
		} else {
			setTitle("");
			setDescription("");
		}
	}, [editingTask]);

	const handleSubmit = () => {
		if (title.trim()) {
			onAddTask({
				title: title.trim(),
				description: description.trim(),
			});
			setTitle("");
			setDescription("");
			onClose();
		}
	};

	const handleCancel = () => {
		setTitle("");
		setDescription("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-white/5 rounded-lg flex items-center justify-center z-50 p-4">
			<div className="bg-[#252525] border border-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-white text-lg font-medium mb-6 text-center">
					{editingTask ? "EDIT NOTE" : "NEW NOTE"}
				</h2>
				<div className="space-y-4">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter task title..."
						className="w-full px-3 py-2 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
						autoFocus
					/>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Enter task description..."
						className="w-full px-3 py-2 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] resize-none"
						rows={3}
					/>
				</div>
				<div className="flex justify-between space-x-3 mt-6">
					<button
						onClick={handleCancel}
						className="px-6 py-2 text-[#6C63FF] border border-[#6C63FF] rounded hover:text-white transition-colors duration-200"
					>
						CANCEL
					</button>
					<button
						onClick={handleSubmit}
						className="px-6 py-2 bg-[#6C63FF] hover:bg-[#4941CC] text-white rounded transition-colors duration-200"
					>
						{editingTask ? "UPDATE" : "APPLY"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
