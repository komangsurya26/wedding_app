"use client";

import { Input } from "@/components/ui/input";
import React from "react";

export function SearchOrder({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch: (e: any) => void;
}) {
  return (
    <div className="flex gap-5">
      <Input
        placeholder="Cari order id..."
        className="h-9 w-40 lg:w-[250px]"
        value={searchTerm}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </div>
  );
}
