import React, { Suspense } from "react";

import { InvitationCreate } from "./components/InvitationCreate";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvitationCreatePage() {
  return (
    <Suspense fallback={<Fallback />}>
      <InvitationCreate />;
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
