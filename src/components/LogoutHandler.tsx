"use client";
import { logoutAction } from "@/app/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LogoutHandler() {
  const router = useRouter();

  useEffect(() => {
    logout();
  }, []);

  async function logout() {
    await logoutAction();
    router.push("/login");
  }

  return <></>;
}
