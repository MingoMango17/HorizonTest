"use client";
import AuthProvider from "@/providers/AuthProvider";

export default function ClientAuthWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthProvider>{children}</AuthProvider>;
}
