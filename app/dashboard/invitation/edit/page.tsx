import React, { Suspense } from "react";
import { InvitationEdit } from "./components/InvitationEdit";
import { FallbackInvitationEdit } from "../components/FallbackInvitationEdit";

export default function InvitationEditPage() {
  return (
    <Suspense fallback={<FallbackInvitationEdit />}>
      <InvitationEdit />
    </Suspense>
  );
}
