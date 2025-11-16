import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Checkout — Resepsi Bali",
};

export default async function CheckoutUpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawInvitId = (await searchParams).invitationId;

  if (!rawInvitId) {
    return redirect("/dashboard/invitation");
  }

  const invitationId = Array.isArray(rawInvitId) ? rawInvitId[0] : rawInvitId;

  return <div>Invitation ID: {invitationId}</div>;
}
