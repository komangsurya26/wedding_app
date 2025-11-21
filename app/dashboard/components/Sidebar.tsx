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
import { getUser } from "@/lib/auth-actions";

export function Sidebar({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      const { user } = await getUser();
      if (mounted) {
        setUser(user);
      }
    };
    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <BreadcrumbDynamic />
        </header>
        <div className="flex flex-1 p-4 min-h-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
