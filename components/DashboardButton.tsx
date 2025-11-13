"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardButton() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (user) {
    return (
      <Link
        href="/dashboard"
        className="rounded-full border border-gray-800 px-3.5 py-1 text-black hover:bg-white/15 transition"
      >
        Dashboard
      </Link>
    );
  }
  return (
    <Link
      href="/login"
      className="rounded-full border border-gray-800 px-3.5 py-1 text-black hover:bg-white/15 transition"
    >
      Masuk / Daftar
    </Link>
  );
}
