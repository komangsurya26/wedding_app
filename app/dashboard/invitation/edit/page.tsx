"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InvitationEditorMenu } from "./components/InvitationEditorMenu";

export default function InvitationEditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

  const invitationIdStr = searchParams.get("invitationId");

  useEffect(() => {
    if (!invitationIdStr) {
      router.push("/dashboard/invitation");
    }
  }, [invitationIdStr, router]);

  if (!invitationIdStr) return null;

  const invitationId = Number(invitationIdStr);
  return (
    <div className="h-full w-full">
      <InvitationEditorMenu invitationId={invitationId} cloudName={cloudName} />
    </div>
  );
}
