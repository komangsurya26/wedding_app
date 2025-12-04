"use client";

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
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavItem } from "./NavItem";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Undangan",
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
      items: [
        {
          title: "Order Saya",
          url: "/dashboard/order",
        },
      ],
    },
    {
      title: "Bantuan",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ProfileSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavItem
                  title="Dashboard"
                  url="/dashboard"
                  closeSidebar={() => setOpenMobile(false)}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavItem
                      title={item.title}
                      url={item.url}
                      closeSidebar={() => setOpenMobile(false)}
                    />
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
