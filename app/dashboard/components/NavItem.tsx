"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function NavItem({ title, url }: { title: string; url: string }) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <>
      <SidebarMenuButton asChild isActive={isActive} >
        <Link href={url}>{title}</Link>
      </SidebarMenuButton>
    </>
  );
}
