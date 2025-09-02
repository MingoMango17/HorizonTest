"use client";
import djangoAPI from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface LoginData {
	username: string;
	password: string;
}

interface UserData {
	username: string;
	name: string;
	id?: number;
}

interface AuthContextType {
	isAuthenticated: boolean;
	userData: UserData;
	isLoading: boolean;
	loginError: string | null;
	login: (data: LoginData) => Promise<void>;
	logout: () => void;
	clearLoginError: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [userData, setUserData] = useState<UserData>({
		username: "",
		name: "",
	});
	const router = useRouter();

	useEffect(() => {
		const checkAuthStatus = async () => {
			const accessToken = localStorage.getItem("accessToken");
			const refreshToken = localStorage.getItem("refreshToken");

			if (accessToken || refreshToken) {
				try {
					const response = await djangoAPI.get("auth/token/");
					const user = response.data.user;
					setUserData({
						username: user.username,
						name: `${user.first_name} ${user.last_name}`,
						id: user.id,
					});
					setIsAuthenticated(true);
				} catch (error) {
					if (refreshToken) {
						try {
							const refreshResponse = await djangoAPI.post(
								"auth/refresh/",
								{
									refresh: refreshToken,
								}
							);
							localStorage.setItem(
								"accessToken",
								refreshResponse.data.access
							);
							const userResponse = await djangoAPI.get(
								"auth/user/"
							);
							setUserData({
								username: userResponse.data.username,
								name: `${userResponse.data.first_name} ${userResponse.data.last_name}`,
								id: userResponse.data.id,
							});
							setIsAuthenticated(true);
						} catch (refreshError) {
							localStorage.removeItem("accessToken");
							localStorage.removeItem("refreshToken");
							setIsAuthenticated(false);
						}
					} else {
						localStorage.removeItem("accessToken");
						setIsAuthenticated(false);
					}
				}
			}
			setIsLoading(false);
		};

		checkAuthStatus();
	}, []);

	const login = async ({ username, password }: LoginData) => {
		try {
			const request = await djangoAPI.post("auth/login/", {
				username: username,
				password: password,
			});

			setLoginError(null);
			setUserData({
				username: request.data.username,
				name: request.data.first_name + " " + request.data.last_name,
			});
			setIsAuthenticated(true);
			localStorage.setItem("accessToken", request.data.tokens.access);
			localStorage.setItem("refreshToken", request.data.tokens.refresh);
			router.push("/");
		} catch (error: any) {
			if (error.response?.status === 401) {
				setLoginError("Invalid username or password");
			} else if (error.response?.status === 400) {
				const errorData = error.response.data;
				if (errorData.non_field_errors) {
					setLoginError(errorData.non_field_errors[0]);
				} else if (errorData.username) {
					setLoginError(`Username: ${errorData.username[0]}`);
				} else if (errorData.password) {
					setLoginError(`Password: ${errorData.password[0]}`);
				} else {
					setLoginError("Please check your credentials");
				}
			} else if (error.response?.status === 429) {
				setLoginError(
					"Too many login attempts. Please try again later"
				);
			} else if (error.code === "NETWORK_ERROR" || !error.response) {
				setLoginError("Network error. Please check your connection");
			} else {
				setLoginError("An unexpected error occurred. Please try again");
			}

			console.error("Login error:", error);
		}
	};

	const logout = async () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setIsAuthenticated(false);
		setLoginError(null);
		setUserData({
			username: "",
			name: "",
		});
		router.push("/login");
	};

	const clearLoginError = () => {
		setLoginError(null);
	};

	const contextValue: AuthContextType = {
		isAuthenticated,
		userData,
		isLoading,
		loginError,
		login,
		logout,
		clearLoginError,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};

export { AuthContext, AuthProvider, useAuth };
export default AuthProvider;
