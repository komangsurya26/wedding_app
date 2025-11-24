"use client";

import React, { Suspense } from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "./components/Invitation";
import { Skeleton } from "@/components/ui/skeleton";

const invitations: InvitationTypes[] = [
  {
    invitationId: 1,
    name: "Komang dan Surya",
    description: "Jumat, 14 Desember 2025",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    expired: false,
    urlInvitation: "http://192.168.1.5:3000",
  },
  {
    invitationId: 2,
    name: "Sedana dan Putri",
    description: "Jumat, 14 Desember 2025",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-65.jpg",
    type: "wedding",
    expired: true,
    urlInvitation: "http://192.168.1.5:3000",
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
