"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Code, Gift, Images, Volume2 } from "lucide-react";
import { FaFemale, FaMale } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GroomEdit } from "./GroomEdit";
import { FotoEdit } from "./FotoEdit";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { toast } from "sonner";

/**
 * CONFIG: semua item terpusat di sini.
 * Untuk komponen besar : gunakan dynamic import agar lazy loaded.
 */
const ICONS_CONFIG = [
  {
    key: "groom",
    icon: <FaMale size={30} />,
    label: "Mempelai Pria",
  },
  {
    key: "bride",
    icon: <FaFemale size={30} />,
    label: "Mempelai Wanita",
  },
  {
    key: "event",
    icon: <CalendarDays size={30} />,
    label: "Acara",
  },
  {
    key: "photos",
    icon: <Images size={30} />,
    label: "Foto",
  },
  {
    key: "gifts",
    icon: <Gift size={30} />,
    label: "Kado Digital",
  },
  {
    key: "audio",
    icon: <Volume2 size={30} />,
    label: "Audio",
  },
  {
    key: "meta",
    icon: <Code size={30} />,
    label: "Meta",
  },
];

export function InvitationEditorMenu({
  invitationId,
  cloudName,
}: {
  invitationId: string;
  cloudName: string;
}) {
  const uploader = useImageUploader({ cloudName });

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setActiveKey(key);
    setOpen(true);
  };

  function handleOpenChange(next: boolean) {
    if (!next) {
      if (uploader.hasUnsaved?.()) {
        toast.warning(
          "Anda punya perubahan yang belum disimpan. Tekan Save untuk menyimpan"
        );
        return;
      }
    }
    setOpen(next);
  }

  const activeItem = ICONS_CONFIG.find((c) => c.key === activeKey);

  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {ICONS_CONFIG.map((item) => (
          <Card
            key={item.key}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleClick(item.key)}
          >
            <CardContent>
              <div className="h-[12vh] flex flex-col gap-3 items-center justify-center">
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

          <div className="overflow-y-auto max-h-[70vh]">
            {activeItem && (
              <>
                {activeItem.key === "groom" && (
                  <GroomEdit invitationId={invitationId} type="groom" />
                )}
                {activeItem.key === "bride" && (
                  <GroomEdit invitationId={invitationId} type="bride" />
                )}
                {activeItem.key === "photos" && (
                  <FotoEdit invitationId={invitationId} uploader={uploader} />
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
