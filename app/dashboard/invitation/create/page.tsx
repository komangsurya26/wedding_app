import React, { Suspense } from "react";
import { Invitation as InvitationTypes } from "@/src/types";
import { Invitation } from "../components/Invitation";
import { FallbackInvitation } from "../components/FallbackInvitation";
import { TEMPLATE_LIST } from "@/src/lib/template-data";

// templates default
const templates: InvitationTypes[] = TEMPLATE_LIST.map((value) => ({
  templateId: value.id,
  name: value.name,
  description: value.description,
  templateType: value.type,
  image: value.img,
  urlTemplate: value.href,
}));

export default function InvitationCreatePage() {
  return (
    <Suspense fallback={<FallbackInvitation />}>
      <Invitation mode="all" invitations={templates} />
    </Suspense>
  );
}
