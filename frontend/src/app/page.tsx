"use client";
import MainPage from "@/components/MainPage";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-12 h-12 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin"></div>

					<div className="text-white text-lg font-medium">
						Loading...
					</div>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return <MainPage />;
}
