"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { InvitationDialog } from "./InvitationDialog";
import { FallbackInvitationEdit } from "../../components/FallbackInvitationEdit";
import { useInvitationStore } from "@/stores/invitation-store";

export function InvitationEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const invitationIdStr = searchParams.get("invitationId");

  const { invitations, fetchInvitations } = useInvitationStore();
  const [existInvitation, setExistInvitation] = useState<boolean | null>(null);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  useEffect(() => {
    if (invitations.length === 0) return;
    async function verify() {
      // Jika tidak ada invitationId → redirect & hentikan
      if (!invitationIdStr) {
        setExistInvitation(false);
        router.push("/dashboard/invitation");
        return;
      }
      const invitationIdNum = Number(invitationIdStr);
      // Cek di store dulu
      const foundInStore = invitations.find(
        (inv) => inv.invitationId === invitationIdNum
      );

      if (!foundInStore) {
        setExistInvitation(false);
        router.push("/dashboard/invitation");
        return;
      }
      // cek expired
      const isExpired = foundInStore.expired;
      if (isExpired) {
        setExistInvitation(false);
        router.push("/dashboard/invitation");
        return;
      }
      setExistInvitation(true);
    }

    verify();
  }, [invitationIdStr, invitations, router]);

  // Saat belum cek atau invalid → tampil fallback
  if (!existInvitation) return <FallbackInvitationEdit />;

  return (
    <InvitationDialog
      invitationId={Number(invitationIdStr)}
      cloudName={cloudName}
    />
  );
}
