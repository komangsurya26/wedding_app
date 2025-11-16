"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginButton() {
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

  return (
    <Link
      href={user ? "/dashboard" : "/login"}
      className="rounded-full border border-gray-800 px-3.5 py-1 text-black hover:bg-white/15 transition cursor-pointer z-50"
    >
      {user ? "Dashboard" : "Masuk / Daftar"}
    </Link>
  );
}
