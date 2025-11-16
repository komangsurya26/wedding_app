import { redirect } from "next/navigation";
import React from "react";

// 1. Jika tidak ada search params request maka redirect not found
// 2. Search params hnya 2 yaitu templateId atau invitationId
// 3. Validasi jika templateId tidak ada maka redirect ke invitation/create
// 4. Validasi jika invitationId tidak ada new order
// 5. Validasi jika invitationId ada maka mew order , tapi dengan invitationId yang sesuai params
// 6. Detail Order Undangan Baru atau Upgrade Undangan

export const metadata = {
  title: "Checkout — Resepsi Bali",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawTemplateId = (await searchParams).templateId;

  if (!rawTemplateId) {
    return redirect("/dashboard/invitation/create");
  }

  const templateId = Array.isArray(rawTemplateId)
    ? rawTemplateId[0]
    : rawTemplateId;

  return <div>Template ID: {templateId}</div>;
}
