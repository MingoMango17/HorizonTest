import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
	options: readonly string[];
	selected: string;
	handleSelect: (value: string) => void;
	dropdownStyle?: string;
}

const Dropdown: React.FC<DropdownProps> = React.memo(
	({ options, selected, handleSelect, dropdownStyle }) => {
		// return <div>Dropdown</div>;
		const [isOpen, setIsOpen] = useState<boolean>(false);
		const dropdownRef = useRef<HTMLDivElement>(null);

		const handleDropdownOpen = () => {
			setIsOpen((prev) => !prev);
		};

		useEffect(() => {
			if (!isOpen) return;

			const handleClickOutside = (event: MouseEvent) => {
				if (
					dropdownRef.current &&
					!dropdownRef.current.contains(event.target as Node)
				) {
					setIsOpen(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside, true);

			return () => {
				document.removeEventListener(
					"mousedown",
					handleClickOutside,
					true
				);
			};
		}, [isOpen]);

		const handleSelectOption = (option: string) => {
			handleSelect(option);
			handleDropdownOpen();
		};
		return (
			<div className="relative" ref={dropdownRef}>
				<button onClick={handleDropdownOpen}>
					<div className={dropdownStyle}>
						<span>{selected}</span>
					</div>
				</button>
				{isOpen && (
					<div className="absolute rounded-lg w-full bg-white">
						{options.map((option, idx) => (
							<div
								key={idx}
								onClick={() => handleSelectOption(option)}
								className="px-3 py-2 text-[#6C63FF] hover:bg-[#6C63FF]/20"
							>
								{option}
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
);

export default Dropdown;
