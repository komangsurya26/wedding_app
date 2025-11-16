"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function GroomSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
