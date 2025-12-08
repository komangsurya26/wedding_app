import React from "react";
import Template1 from "../template/[id]/components/Template1";
import Template2 from "../template/[id]/components/Template2";
import { Invitation } from "@/src/types";
import { notFound } from "next/navigation";

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  //fetch api => /api/invitations?slug={slug} to get data template id , isikan jika error redirect ke halaman not found
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invitations?slug=${slug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return notFound();
  }
  const json = await res.json();
  const data = json.data;

  if (!data) {
    return notFound();
  }

  const photo_brides = data.photo_brides.map((d: any) => d.image_url);
  const photo_grooms = data.photo_grooms.map((d: any) => d.image_url);
  const photo_landscapes = data.photo_landscapes.map((d: any) => d.image_url);
  const photo_portraits = data.photo_portraits.map((d: any) => d.image_url);

  const invitationData: Invitation = {
    ...data,
    groom: data.grooms,
    bride: data.brides,
    photos: {
      photo_brides: photo_brides,
      photo_grooms: photo_grooms,
      photo_landscapes: photo_landscapes,
      photo_portraits: photo_portraits,
    },
    audio: data.audios,
    video: data.video_youtubes,
    countdown: data.countdowns,
    templateId: data.template_id,
  };
  const template_id = invitationData.templateId;

  const MAP: Record<string, React.ComponentType<{ config: Invitation }>> = {
    "1": Template1,
    "2": Template2,
  };

  const TemplateComponent = MAP[String(template_id)] ?? MAP["1"];

  return <TemplateComponent config={invitationData} />;
}
