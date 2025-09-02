"use client";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const inputStyle =
	"w-full border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-transparent bg-transparent";

interface LoginData {
	username: string;
	password: string;
}

const LoginComponent = () => {
	const { login, isAuthenticated, isLoading, loginError, clearLoginError } =
		useAuth();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [localError, setLocalError] = useState<string | null>(null);

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			router.push("/");
		}
	}, [isAuthenticated, isLoading, router]);

	useEffect(() => {
		if (loginError) {
			setLocalError(loginError);
		}
	}, [loginError]);

	const [formData, setFormData] = useState<LoginData>({
		username: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (localError) {
			setLocalError(null);
		}
		if (loginError) {
			clearLoginError();
		}

		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setLocalError(null);

		if (!formData.username.trim() || !formData.password.trim()) {
			setLocalError("Please enter both username and password");
			return;
		}

		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);
		try {
			await login(formData);
		} catch (error) {
			console.error("Login submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};
	const displayError = localError || loginError;

	return (
		<div className="flex justify-center mt-30 mx-auto w-full max-w-md">
			<div className="w-full">
				<div className="mb-8">
					<span className="text-3xl font-bold text-white">
						Sign in to your account
					</span>
				</div>

				{/* Error Message */}
				{displayError && (
					<div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
						<div className="flex items-center">
							<svg
								className="w-5 h-5 text-red-400 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="text-red-300 text-sm">
								{displayError}
							</span>
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit} noValidate>
					<div className="space-y-6">
						<div>
							<label
								htmlFor="username"
								className="mb-2 block text-white"
							>
								Username:
							</label>
							<input
								id="username"
								name="username"
								type="text"
								placeholder="Username"
								className={`${inputStyle} ${
									displayError
										? "border-red-500 focus:ring-red-500"
										: "focus:ring-[#6C63FF]"
								}`}
								value={formData.username}
								onChange={handleChange}
								disabled={isSubmitting}
								required
								autoComplete="username"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="mb-2 block text-white"
							>
								Password:
							</label>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="Password"
								className={`${inputStyle} ${
									displayError
										? "border-red-500 focus:ring-red-500"
										: "focus:ring-[#6C63FF]"
								}`}
								value={formData.password}
								onChange={handleChange}
								disabled={isSubmitting}
								required
								autoComplete="current-password"
							/>
						</div>
						<button
							type="submit"
							disabled={
								isSubmitting ||
								!formData.username.trim() ||
								!formData.password.trim()
							}
							className="bg-[#6C63FF] cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-3 rounded-lg text-white font-medium transition-opacity duration-200 flex items-center justify-center"
						>
							{isSubmitting ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Signing in...
								</>
							) : (
								"Sign in"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginComponent;
