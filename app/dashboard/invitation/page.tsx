"use client";

import React from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "./components/Invitation";

const invitations: InvitationTypes[] = [
  {
    invitationId: 1,
    name: "Komang dan Surya",
    description: "Jumat, 14 Desember 2025",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    expired: false,
    urlInvitation: "http://192.168.1.5:3000",
  },
  {
    invitationId: 2,
    name: "Sedana dan Putri",
    description: "Jumat, 14 Desember 2025",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-65.jpg",
    type: "wedding",
    expired: true,
    urlInvitation: "http://192.168.1.5:3000",
  },
];

export default function InvitationPage() {
  return <Invitation invitations={invitations} />;
}
