import React, { useState } from "react";
import Dropdown from "./Dropdown";

const MainPage = () => {
	const [filter, setFilter] = useState<string>("All");
	return (
		<div className="flex mt-32">
			<div className="w-full max-w-3xl mx-auto flex justify-center items-center space-x-6 px-4">
				<input
					type="text"
					className="w-full border border-white rounded-lg px-4 py-2"
					placeholder="Search..."
				/>

				<Dropdown
					options={["All", "Pending", "Done"]}
					selected={filter}
					handleSelect={setFilter}
					dropdownStyle={"w-24 bg-[#6C63FF] px-3 py-2 rounded-lg hover:bg-[#4941CC]"}
				/>
			</div>
		</div>
	);
};

export default MainPage;
