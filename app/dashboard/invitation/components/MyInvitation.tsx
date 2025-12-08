"use client";

import React, { useEffect } from "react";
import { FallbackInvitation } from "./FallbackInvitation";
import { Invitation } from "./Invitation";
import { useInvitationStore } from "@/src/stores/invitation-store";

export function MyInvitation() {
  const myInvitations = useInvitationStore((state) => state.invitations);
  const loading = useInvitationStore((state) => state.loading);
  const fetchInvitations = useInvitationStore(
    (state) => state.fetchInvitations
  );

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  if (loading) return <FallbackInvitation />;

  return <Invitation mode="mine" invitations={myInvitations} />;
}
