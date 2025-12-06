"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { InvitationDialog } from "./InvitationDialog";
import { FallbackInvitationEdit } from "../../components/FallbackInvitationEdit";

export function InvitationEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const invitationIdStr = searchParams.get("invitationId");

  const [existInvitation, setExistInvitation] = useState<boolean | null>(null);

  useEffect(() => {
    async function verify() {
      // Jika tidak ada invitationId → redirect & hentikan
      if (!invitationIdStr) {
        setExistInvitation(false);
        router.push("/dashboard/invitation");
        return;
      }

      const res = await fetch(
        `/api/invitations/${invitationIdStr}?expired=false`,
        {
          credentials: "include",
        }
      );

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setExistInvitation(false);
        router.push("/dashboard/invitation");
        return;
      }

      setExistInvitation(true);
    }

    verify();
  }, [invitationIdStr, router]);

  // Saat belum cek atau invalid → tampil fallback
  if (!existInvitation) return <FallbackInvitationEdit />;

  return (
    <InvitationDialog
      invitationId={Number(invitationIdStr)}
      cloudName={cloudName}
    />
  );
}
