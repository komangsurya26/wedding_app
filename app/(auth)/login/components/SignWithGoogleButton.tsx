"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/src/actions/auth-actions";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignWithGoogleButton({ nextUrl }: { nextUrl: string }) {
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
