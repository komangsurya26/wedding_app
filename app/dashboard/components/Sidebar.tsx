"use client";

import { ReactNode, useEffect, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { BreadcrumbDynamic } from "./BreadcrumbDynamic";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getProfile } from "@/lib/auth-actions";
import { UserProps } from "@/app/types";
import { Home } from "lucide-react";
import Link from "next/link";

export function Sidebar({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  useEffect(() => {
    const fetchUser = async () => {
      const { profile } = await getProfile();
      if (profile) {
        setUser(profile);
      }
    };
    fetchUser();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="h-screen">
        <header className="flex justify-between h-16 shrink-0 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbDynamic />
          </div>
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <Home />
            </Link>
          </div>
        </header>
        <div className="flex flex-1 p-4 min-h-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
