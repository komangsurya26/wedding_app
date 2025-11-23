"use client";

import React from "react";
import { redirect, useSearchParams } from "next/navigation";
import { InvitationEditorMenu } from "./components/InvitationEditorMenu";

export default function InvitationEditPage() {
  const searchParams = useSearchParams();

  const invitationIdStr = searchParams.get("invitationId");
  if (!invitationIdStr) return redirect("/dashboard/invitation");

  const invitationId = Number(invitationIdStr);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

  return (
    <div className="h-full w-full">
      <InvitationEditorMenu invitationId={invitationId} cloudName={cloudName} />
    </div>
  );
}
