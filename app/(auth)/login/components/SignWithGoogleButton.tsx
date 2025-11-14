"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignWithGoogleButton() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "";

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        signInWithGoogle(nextUrl);
      }}
    >
      <FaGoogle className="mr-2" />
      Masuk dengan Google
    </Button>
  );
}
