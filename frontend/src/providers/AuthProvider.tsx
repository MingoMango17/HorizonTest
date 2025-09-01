"use client";

import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useState } from "react";

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
  login: (data: LoginData) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    name: "",
  });

  const router = useRouter();

  const login = async ({ username, password }: LoginData) => {
    console.log("login logic here", username, password);
    setIsAuthenticated(true);
    router.push("/");
  };

  const logout = async () => {
    console.log("logout here");
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
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
