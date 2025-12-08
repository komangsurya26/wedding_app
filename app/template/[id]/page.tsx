import { redirect } from "next/navigation";
import { DEFAULT_INVITATIONS } from "@/src/lib/default-invitation";
import { Invitation } from "@/src/types";
import Template1 from "./components/Template1";
import Template2 from "./components/Template2";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  // mencari default invitation berdasarkan templateId
  const config = DEFAULT_INVITATIONS.find((t) => String(t.templateId) === id);
  if (!config) {
    redirect("/");
  }

  const MAP: Record<string, React.ComponentType<{ config: Invitation }>> = {
    "1": Template1,
    "2": Template2,
  };

  const TemplateComponent = MAP[id] ?? MAP["1"];

  return <TemplateComponent config={config} />;
}

export function FallbackTemplate() {
  return <div className="fixed inset-0 bg-black z-[9999]"></div>;
}
