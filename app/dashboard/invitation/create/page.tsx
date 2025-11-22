"use client";

import React from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "../components/Invitation";

// templates default
const templates: InvitationTypes[] = [
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/1",
  },
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/1",
  },
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/1",
  },
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/1",
  },
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/1",
  },
  {
    templateId: 1,
    name: "Template 1 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "wedding",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/1",
  },
  {
    templateId: 2,
    name: "Template 2 - Glass",
    description: "Wedding dengan konsep kaca yang elegan",
    type: "metatah",
    image: "https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp",
    urlTemplate: "http://localhost:3000/template/2",
  },
];

export default function InvitationCreatePage() {
  return <Invitation mode="create" invitations={templates} />;
}
