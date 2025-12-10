"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GroomEdit } from "./GroomEdit";
import { FotoEdit } from "./FotoEdit";
import { PhotoState, useImageUploader } from "@/hooks/use-image-uploader";
import { toast } from "sonner";
import { EventEdit } from "./EventEdit";
import { ICONS_CONFIG } from "../icons/Icons";
import { GiftEdit } from "./GiftEdit";
import { AudioEdit } from "./AudioEdit";
import { VideoEdit } from "./VideoEdit";
import { CountdownEdit } from "./CountdownEdit";
import { MetaEdit } from "./MetaEdit";

export function InvitationDialog({
  invitationId,
  cloudName,
}: {
  invitationId: number;
  cloudName: string;
}) {
  const uploader = useImageUploader({ cloudName });
  const { photos, hasUnsavedPortrait, hasUnsavedLandscape, hasUnsaved } = uploader

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setActiveKey(key);
    setOpen(true);
  };

  const activeItem = ICONS_CONFIG.find((c) => c.key === activeKey);


  function handleOpenChange(next: boolean) {
    if (!next) {
      if (photos.some((p: PhotoState) => p?.uploading)) {
        toast.warning("Upload sedang berjalan. Tunggu sampai selesai.");
        return;
      }
      if (photos.some((p: PhotoState) => p?.removing)) {
        toast.warning("Hapus sedang berjalan. Tunggu sampai selesai.");
        return;
      }
      if (hasUnsaved?.()) {
        if (activeItem?.key === "photos") {
          const unsavedPortrait = hasUnsavedPortrait();
          const unsavedLandscape = hasUnsavedLandscape();

          if (unsavedPortrait) toast.warning("Harap simpan perubahan di Foto Portrait terlebih dahulu.");
          else if (unsavedLandscape) toast.warning("Harap simpan perubahan di Foto Landscape terlebih dahulu.");
          else toast.warning("Harap simpan perubahan foto terlebih dahulu.");
        } else {
          toast.warning(`Harap simpan perubahan di ${activeItem?.label} terlebih dahulu.`);
        }
        return;
      }
    }
    setOpen(next);
  }


  return (
    <div className="h-full w-full overflow-y-auto hide-scrollbar">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {ICONS_CONFIG.map((item) => (
          <Card
            key={item.key}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleClick(item.key)}
          >
            <CardContent>
              <div className="h-[12vh] flex flex-col gap-3 items-center text-center justify-center">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{activeItem?.label ?? "Detail"}</DialogTitle>
            <DialogDescription>
              Mengatur {activeItem?.label?.toLowerCase() ?? ""} untuk undangan
            </DialogDescription>
          </DialogHeader>

          <div>
            {activeItem && (
              <>
                {activeItem.key === "groom" && (
                  <GroomEdit
                    invitationId={invitationId}
                    type="groom"
                    uploader={uploader}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "bride" && (
                  <GroomEdit
                    invitationId={invitationId}
                    type="bride"
                    uploader={uploader}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "event" && (
                  <EventEdit
                    invitationId={invitationId}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "photos" && (
                  <FotoEdit
                    invitationId={invitationId}
                    uploader={uploader}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "gifts" && (
                  <GiftEdit
                    invitationId={invitationId}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "audio" && (
                  <AudioEdit
                    invitationId={invitationId}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "video" && (
                  <VideoEdit
                    invitationId={invitationId}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "countdown" && (
                  <CountdownEdit
                    invitationId={invitationId}
                    onClose={() => setOpen(false)}
                  />
                )}
                {activeItem.key === "meta" && (
                  <MetaEdit
                    invitationId={invitationId}
                    uploader={uploader}
                    onClose={() => setOpen(false)}
                  />
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
