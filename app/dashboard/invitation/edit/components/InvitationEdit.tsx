"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { InvitationEditMenu } from "./InvitationEditorMenu";

export function InvitationEdit() {
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
      <InvitationEditMenu invitationId={invitationId} cloudName={cloudName} />
    </div>
  );
}
