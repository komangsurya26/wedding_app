"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavItem({ title, url }: { title: string; url: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <>
      <SidebarMenuButton
        isActive={isActive}
        onClick={() => {
          router.push(url);
        }}
      >
        {title}
      </SidebarMenuButton>
    </>
  );
}
