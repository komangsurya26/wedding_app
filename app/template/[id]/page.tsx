import { ConfigTemplate } from "@/src/types";
import { TemplateMain as Template1 } from "./components/template1/TemplateMain";
import { TemplateMain as Template2 } from "./components/template2/TemplateMain";

import { redirect } from "next/navigation";
import { JSX } from "react";

const TEMPLATE: ConfigTemplate[] = [
  {
    templateId: 1,
    videoSrc: "https://www.youtube.com/embed/6FYtKVFik_8?mute=1&autoplay=1",
    videoIdYoutube: "T2fNPf3UIY8",
    // videoIdYoutube: "6FYtKVFik_8",
    images: {
      bride:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_7016-scaled.webp",
      groom:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_7023-scaled.webp",
      couple: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
      ],
      portrait: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6849-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_7023-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_7016-scaled.webp",
      ],
      landscape: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
      ],
    },
  },
  {
    templateId: 2,
    videoSrc: "https://www.youtube.com/embed/6FYtKVFik_8?mute=1&autoplay=1",
    videoIdYoutube: "6FYtKVFik_8",
    images: {
      bride:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      groom:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      couple: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6667-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
      ],
      portrait: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
      ],
      landscape: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      ],
    },
  },
  {
    templateId: 3,
    videoSrc: "https://www.youtube.com/embed/6FYtKVFik_8?mute=1&autoplay=1",
    videoIdYoutube: "6FYtKVFik_8",
    images: {
      bride:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      groom:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      couple: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6667-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
      ],
      portrait: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
      ],
      landscape: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      ],
    },
  },
];

interface Props {
  params: { id: string };
}

export default async function TemplatePage({ params }: Props) {
  const { id } = await params;
  const config = TEMPLATE.find((t) => String(t.templateId) === id);
  if (!config) {
    redirect("/");
  }

  const MAP: Record<
    string,
    (props: { config: ConfigTemplate }) => JSX.Element
  > = {
    "1": Template1,
    "2": Template2,
  };

  const TemplateComponent = MAP[id];
  if (!TemplateComponent) {
    redirect("/");
  }

  return <TemplateComponent config={config} />;
}
