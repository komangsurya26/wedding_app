"use client";

import React, { Suspense } from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "./components/Invitation";
import { Skeleton } from "@/components/ui/skeleton";

// my invitations
const invitations: InvitationTypes[] = [
  {
    invitationId: 2,
    name: "Komang dan Surya",
    description: "Jumat, 14 Desember 2025",
    type: "wedding",
    image: "",
    expired: false,
    urlInvitation: "",
  },
];

export default function InvitationPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <Invitation invitations={invitations} />
    </Suspense>
  );
}

function Fallback() {
  return (
    <div className="w-full h-full">
      <div className="mb-10 flex flex-row gap-3">
        <Skeleton className="h-10 w-50" />
        <Skeleton className="h-10 w-30" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
