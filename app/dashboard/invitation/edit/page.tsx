import React from "react";
import { redirect } from "next/navigation";
import { InvitationEditorMenu } from "./components/InvitationEditorMenu";

export default async function InvitationEditPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawInvitId = (await searchParams).invitationId;
  if (!rawInvitId) return redirect("/dashboard/invitation");
  const invitationStr = Array.isArray(rawInvitId) ? rawInvitId[0] : rawInvitId;
  const invitationId = Number(invitationStr);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;

  return (
    <div className="h-full w-full">
      <InvitationEditorMenu invitationId={invitationId} cloudName={cloudName} />
    </div>
  );
}
