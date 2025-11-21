"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";

export function NavItem({
  title,
  url,
  closeSidebar,
}: {
  title: string;
  url: string;
  closeSidebar: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          href={url}
          onClick={() => {
            closeSidebar();
          }}
        >
          {title}
        </Link>
      </SidebarMenuButton>
    </>
  );
}
