"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/src/stores/user-store";

export default function LoginButton() {
  const user = useUserStore((state) => state.user);
  const refresh = useUserStore((state) => state.refresh);
  const loading = useUserStore((state) => state.loading);

  useEffect(() => {
    if (!user) {
      refresh();
    }
  }, [user, refresh]);

  if (loading) {
    return (
      <div className="rounded-full border border-gray-800 px-3.5 py-1 text-black hover:bg-white/15 transition cursor-pointer z-50">
        Loading...
      </div>
    );
  }
  return (
    <Link
      href={user ? "/dashboard" : "/login"}
      className="rounded-full border border-gray-800 px-3.5 py-1 text-black hover:bg-white/15 transition cursor-pointer z-50"
    >
      {user ? "Dashboard" : "Masuk / Daftar"}
    </Link>
  );
}
