import React, { Suspense } from "react";
import { InvitationEdit } from "./components/InvitationEdit";
import { Skeleton } from "@/components/ui/skeleton";

function Fallback() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

export default function InvitationEditPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <InvitationEdit />
    </Suspense>
  );
}
