import * as React from "react";

import { ProfileSwitcher } from "../components/ProfileSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavItem } from "./NavItem";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Undangan",
      url: "#",
      items: [
        {
          title: "Undangan Saya",
          url: "/dashboard/invitation",
        },
        {
          title: "Buat Undangan",
          url: "/dashboard/invitation/create",
        },
      ],
    },
    {
      title: "Order",
      url: "#",
      items: [
        {
          title: "Order Saya",
          url: "/dashboard/order",
        },
        {
          title: "Invoice",
          url: "/dashboard/invoice",
        },
      ],
    },
    {
      title: "Bantuan",
      url: "#",
      items: [
        {
          title: "Kontak Kami",
          url: "https://wa.me/6281353285093?text=hallo",
        },
        {
          title: "FAQ",
          url: "/dashboard/faq",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: { user: any } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ProfileSwitcher user={user} />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavItem title={item.title} url={item.url} />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
