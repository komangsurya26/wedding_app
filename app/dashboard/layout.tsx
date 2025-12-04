import { ReactNode } from "react";
import { BreadcrumbDynamic } from "./components/BreadcrumbDynamic";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import { AppSidebar } from "./components/AppSidebar";

export const metadata = {
  title: "Dashboard — Resepsi Bali",
};

export default async function DaashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen overflow-x-hidden">
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
