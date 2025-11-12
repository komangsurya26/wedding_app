import Template1 from "@/app/components/templates/template1/main";
import Template2 from "@/app/components/templates/template2/main";

import { notFound } from "next/navigation";

interface TemplateConfig {
  templateId: number;
  videoSrc?: string;
  videoIdYoutube?: string;
  imageSrc?: string;
  images?: any;
}

const TEMPLATE: TemplateConfig[] = [
  {
    templateId: 1,
    videoSrc: "https://www.youtube.com/embed/6FYtKVFik_8?mute=1&autoplay=1",
    videoIdYoutube: "6FYtKVFik_8",
    images: {
      bride:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_7016-scaled.webp",
      groom:
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_7023-scaled.webp",
      couple: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
      ],
      potrait: [
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6810-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
        "https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp",
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
      potrait: [
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
      potrait: [
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

interface PageProps {
  params: { id: string };
}

// generate metadata dynamically

async function Page({ params }: PageProps) {
  const { id } = await params;
  const config = TEMPLATE.find((t) => String(t.templateId) === id);
  if (!config) return notFound();

  const MAP: Record<string, React.ComponentType<{ config: TemplateConfig }>> = {
    "1": Template1,
    "2": Template2,
  };

  const TemplateComponent = MAP[id];
  if (!TemplateComponent) return notFound();

  return <TemplateComponent config={config} />;
}

export default Page;
