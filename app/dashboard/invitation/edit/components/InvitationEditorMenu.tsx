"use client";

import React, { useState, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Code, Gift, Images, Volume2 } from "lucide-react";
import { FaFemale, FaMale } from "react-icons/fa";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { GroomEdit } from "./GroomEdit";

/**
 * CONFIG: semua item terpusat di sini.
 * Untuk komponen besar : gunakan dynamic import agar lazy loaded.
 */
const ICONS_CONFIG = [
  {
    key: "groom",
    icon: <FaMale size={30} />,
    label: "Mempelai Pria",
    component: GroomEdit,
  },
  {
    key: "bride",
    icon: <FaFemale size={30} />,
    label: "Mempelai Wanita",
    component: GroomEdit,
  },
  {
    key: "event",
    icon: <CalendarDays size={30} />,
    label: "Acara",
    component: GroomEdit,
  },
  {
    key: "photos",
    icon: <Images size={30} />,
    label: "Foto",
    component: GroomEdit,
  },
  {
    key: "gifts",
    icon: <Gift size={30} />,
    label: "Kado Digital",
    component: GroomEdit,
  },
  {
    key: "audio",
    icon: <Volume2 size={30} />,
    label: "Audio",
    component: GroomEdit,
  },
  {
    key: "meta",
    icon: <Code size={30} />,
    label: "Meta",
    component: GroomEdit,
  },
];

export function InvitationEditorMenu({
  invitationId,
}: {
  invitationId: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setActiveKey(key);
    setOpen(true);
  };

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{activeItem?.label ?? "Detail"}</DialogTitle>
            <DialogDescription>
              Mengatur {activeItem?.label?.toLowerCase() ?? ""} untuk undangan
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {activeItem && (
              <Suspense>
                <activeItem.component invitationId={invitationId} />
              </Suspense>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
