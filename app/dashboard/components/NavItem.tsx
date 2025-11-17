"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavItem({
  title,
  url,
  closeSidebar,
}: {
  title: string;
  url: string;
  closeSidebar: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <>
      <SidebarMenuButton
        isActive={isActive}
        onClick={async () => {
          closeSidebar();
          await new Promise((r) => setTimeout(r, 80));
          router.push(url);
        }}
      >
        {title}
      </SidebarMenuButton>
    </>
  );
}
