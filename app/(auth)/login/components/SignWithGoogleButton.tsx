"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignWithGoogleButton() {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <FaGoogle className="mr-2" />
      Login with Google
    </Button>
  );
}
