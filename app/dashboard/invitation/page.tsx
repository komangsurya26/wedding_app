import React, { Suspense } from "react";
import { MyInvitation } from "./components/MyInvitation";
import { FallbackInvitation } from "./components/FallbackInvitation";

export default function InvitationPage() {
  return (
    <Suspense fallback={<FallbackInvitation />}>
      <MyInvitation />
    </Suspense>
  );
}
