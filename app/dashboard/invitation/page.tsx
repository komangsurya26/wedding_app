"use client";

import React, { useEffect, useState } from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "./components/Invitation";
import { FallbackInvitation } from "./components/FallbackInvitation";
import { toast } from "sonner";

export default function InvitationPage() {
  const [loading, setLoading] = useState(true);
  const [myInvitations, setMyInvitations] = useState<InvitationTypes[]>([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/invitations", {
          credentials: "include",
          cache: "no-store",
        });
        const json = await res.json();

        const data = json.data.map((item: any) => ({
          invitationId: item.id,
          name: item.invitation_name,
          type: item.type ?? "wedding",
          image: item.image ?? "",
          expired: item.expires_at
            ? new Date() > new Date(item.expires_at)
            : false,
          urlInvitation: item.invitation_url ?? "",
        }));
        setMyInvitations(data);
      } catch (error) {
        toast.warning("Terjadi Kesalahan");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  if (loading) return <FallbackInvitation />;

  return <Invitation mode="mine" invitations={myInvitations} />;
}
