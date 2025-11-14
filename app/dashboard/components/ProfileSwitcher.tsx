"use client";

import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { signout } from "@/lib/auth-actions";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function ProfileSwitcher({ user }: { user: any }) {
  const router = useRouter();

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
                <Image
                  src={user.user_metadata?.avatar_url}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="size-8 rounded-full object-cover"
                />
              ) : (
                <Skeleton className="h-8 w-8 rounded-full" />
              )}
              <div className="flex flex-col gap-0.5 leading-none">
                {user ? (
                  <span className="font-medium">
                    {user.user_metadata?.full_name ?? user.email}
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
            <DropdownMenuItem>
              <Link href={"/"}>Halaman Utama</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/settings"}>Pengaturan</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signout}>Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
