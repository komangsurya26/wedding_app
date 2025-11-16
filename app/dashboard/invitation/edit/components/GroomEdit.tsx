"use client";

import React, { useEffect, useState } from "react";
import GroomSkeleton from "./GroomSkeleton";

export function GroomEdit({ invitationId }: { invitationId: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) return <GroomSkeleton />;

  return (
    <div>
      <h3 className="text-lg font-semibold">Mempelai Pria</h3>
      <p className="text-sm text-muted-foreground">ID: {invitationId}</p>

      {/* Contoh singkat form / input */}
      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-sm">Nama</span>
          <input
            className="w-full rounded border px-3 py-2 mt-1"
            placeholder="Nama mempelai pria"
          />
        </label>

        <label className="block">
          <span className="text-sm">Deskripsi</span>
          <textarea className="w-full rounded border px-3 py-2 mt-1" rows={3} />
        </label>
      </div>
    </div>
  );
}
