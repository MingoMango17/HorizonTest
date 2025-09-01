"use client";
import { useAuth } from "@/providers/AuthProvider";
import React, { useState } from "react";

const inputStyle =
	"w-full border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-transparent";

interface LoginData {
	username: string;
	password: string;
}

const LoginComponent = () => {
	const { login } = useAuth();

	const [formData, setFormData] = useState<LoginData>({
		username: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("sign in", formData);
		login(formData);
	};

	return (
		<div className="flex justify-center mt-30 mx-auto w-full max-w-md">
			<div className="">
				<div className="mb-8">
					<span className="text-3xl font-bold text-white">
						Sign in to your account
					</span>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="space-y-6">
						<div className="">
							<label htmlFor="username" className="mb-2 block">
								Username:{" "}
							</label>
							<input
								id="username"
								name="username"
								type="text"
								placeholder="Username"
								className={inputStyle}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="password" className="mb-2 block">
								Password:{" "}
							</label>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="Password"
								className={inputStyle}
								onChange={handleChange}
							/>
						</div>
						<button
							type="submit"
							className="bg-[#6C63FF] cursor-pointer hover:opacity-90 w-full px-4 py-3 rounded-lg"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginComponent;
