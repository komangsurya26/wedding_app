import { redirect } from "next/navigation";
import TemplateLoader from "./components/TemplateLoader";
import { TEMPLATE } from "@/src/lib/config-template";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const config = TEMPLATE.find((t) => String(t.templateId) === id);
  if (!config) {
    redirect("/");
  }

  return <TemplateLoader id={id} config={config} />;
}
