"use client";

import { ReactNode } from "react";
import { Sidebar } from "./components/Sidebar";

export const metadata = {
  title: "Dashboard — Resepsi Bali",
};

export default async function DaashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
