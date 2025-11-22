"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { signout } from "@/src/lib/auth-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUser } from "@/src/providers/UserProvider";

export function ProfileSwitcher() {
  // const router = useRouter();
  // const { setOpenMobile } = useSidebar();
  // const navigate = async (path: string) => {
  //   setOpenMobile(false);
  //   await new Promise((r) => setTimeout(r, 800)); // ini penting agar open mobile benar" ke close , untuk reset dom
  //   router.push(path);
  // };

  const user = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {user ? (
                user.avatar_url ? (
                  <Avatar className="size-8">
                    <AvatarImage src={user.avatar_url} alt="@user" />
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarFallback>
                      {user.full_name?.[0]?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                )
              ) : (
                <Skeleton className="h-8 w-8 rounded-full" />
              )}
              <div className="flex flex-col gap-0.5 leading-none">
                {user ? (
                  <span className="font-medium">
                    {user.full_name ?? user.email}
                  </span>
                ) : (
                  <Skeleton className="h-4 w-[150px]" />
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            <Link href="/dashboard/settings">
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={signout}>Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
