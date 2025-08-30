"use client"
import { useAuth } from "@/providers/AuthProvider";

export default function Home() {
  const auth = useAuth();
  
  // if (auth.isAuthenticated)
  return <>hi</>;
}
