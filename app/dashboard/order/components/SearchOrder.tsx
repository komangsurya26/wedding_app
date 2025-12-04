"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export function SearchOrder() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex gap-5">
      <Input
        placeholder="Cari order..."
        className="h-9 w-40 lg:w-[250px]"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
}
