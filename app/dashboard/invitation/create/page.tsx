"use client";

import React, { Suspense } from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "../components/Invitation";
import { Skeleton } from "@/components/ui/skeleton";

// templates default
const templates: InvitationTypes[] = [
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "",
    urlTemplate: "",
  },
  {
    templateId: 2,
    name: "Template 2 - Dark",
    description: "Wedding dengan konsep hitam yang elegan",
    type: "wedding",
    image: "",
    urlTemplate: "",
  },
];

export default function InvitationCreatePage() {
  return (
    <Suspense fallback={<Fallback />}>
      <Invitation mode="create" invitations={templates} />
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
