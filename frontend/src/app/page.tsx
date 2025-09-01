"use client";
import MainPage from "@/components/MainPage";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, router]);
	return <MainPage />;
}
