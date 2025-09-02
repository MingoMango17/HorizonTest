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
	login: (data: LoginData) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userData, setUserData] = useState<UserData>({
		username: "",
		name: "",
	});

	const router = useRouter();

	useEffect(() => {
		const checkAuthStatus = async () => {
			setIsLoading(true);
			const accessToken = localStorage.getItem("accessToken");
			const refreshToken = localStorage.getItem("refreshToken");

			if (accessToken || refreshToken) {
				try {
					// Try to fetch user data with existing token
					const response = await djangoAPI.get("auth/token/"); // Adjust endpoint as needed
					const user = response.data.user;
					setUserData({
						username: user.username,
						name: `${user.first_name} ${user.last_name}`,
						id: user.id,
					});
					setIsAuthenticated(true);
				} catch (error) {
					// If token is invalid, try to refresh
					if (refreshToken) {
						try {
							const refreshResponse = await djangoAPI.post(
								"auth/refresh/",
								{
									refresh: refreshToken,
								}
							);

							// Update access token
							localStorage.setItem(
								"accessToken",
								refreshResponse.data.access
							);

							// Try fetching user data again
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
	}, []); // Empty dependency array means this runs once on mount
	const login = async ({ username, password }: LoginData) => {
		try {
			const request = await djangoAPI.post("auth/login/", {
				username: username,
				password: password,
			});
			setUserData({
				username: request.data.username,
				name: request.data.first_name + request.data.last_name,
			});
			setIsAuthenticated(true);

			localStorage.setItem("accessToken", request.data.tokens.access);
			localStorage.setItem("refreshToken", request.data.tokens.refresh);
		} catch (error) {
			setIsAuthenticated(false);
		} finally {
			router.push("/");
		}
	};

	const logout = async () => {
		console.log("logout here");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setIsAuthenticated(false);
	};

	const contextValue: AuthContextType = {
		isAuthenticated,
		userData,
		isLoading,
		login,
		logout,
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
