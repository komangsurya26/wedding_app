"use client";
import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React, { useEffect } from "react";

export function FotoEdit({
  invitationId,
  uploader,
}: {
  invitationId: string;
  uploader: ReturnType<
    typeof import("@/hooks/use-image-uploader").useImageUploader
  >;
}) {
  useEffect(() => {
    uploader.initSlots(2);
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      photos: uploader.photos.map((p) => ({
        url: p.url,
        public_id: p.public_id,
      })),
    };
    await fetch("/api/invitations/update-foto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          {uploader.photos.map((_, i) => (
            <ImageUploadField
              key={i}
              index={i}
              uploader={uploader}
              invitationId={invitationId}
            />
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </div>
    </form>
  );
}
