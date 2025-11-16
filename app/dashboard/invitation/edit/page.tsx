import React from "react";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Code, Gift, Images, Volume2 } from "lucide-react";
import { FaFemale, FaMale } from "react-icons/fa";
import { InvitationEditorMenu } from "./components/InvitationEditorMenu";

const icons = [
  {
    icon: <FaMale size={30} />,
    description: "Mempelai Pria",
  },
  {
    icon: <FaFemale size={30} />,
    description: "Mempelai Wanita",
  },
  {
    icon: <CalendarDays size={30} />,
    description: "Acara",
  },
  {
    icon: <Images size={30} />,
    description: "Foto",
  },
  {
    icon: <Gift size={30} />,
    description: "Kado Digital",
  },
  {
    icon: <Volume2 size={30} />,
    description: "Audio",
  },
  {
    icon: <Code size={30} />,
    description: "Meta",
  },
];

export default async function InvitationEditPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawInvitId = (await searchParams).invitationId;
  if (!rawInvitId) return redirect("/dashboard/invitation");
  const invitationId = Array.isArray(rawInvitId) ? rawInvitId[0] : rawInvitId;

  return (
    <div className="h-full w-full">
      <InvitationEditorMenu invitationId={invitationId} />
    </div>
  );
}
