"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/src/providers/UserProvider";

export default function LoginButton() {
  const user = useUser();
  return (
    <Link
      href={user ? "/dashboard" : "/login"}
      className="rounded-full border border-gray-800 px-3.5 py-1 text-black hover:bg-white/15 transition cursor-pointer z-50"
    >
      {user ? "Dashboard" : "Masuk / Daftar"}
    </Link>
  );
}
