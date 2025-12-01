import { redirect } from "next/navigation";
import TemplateLoader from "./components/TemplateLoader";
import { DEFAULT_INVITATIONS } from "@/src/lib/default-invitation";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const config = DEFAULT_INVITATIONS.find((t) => String(t.templateId) === id);
  if (!config) {
    redirect("/");
  }

  return <TemplateLoader id={id} config={config} />;
}
