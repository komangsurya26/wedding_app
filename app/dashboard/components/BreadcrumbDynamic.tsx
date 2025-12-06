"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const breadcrumbConfig: Record<string, string[]> = {
  // Record untuk membuat key string dan value array string
  "/dashboard": ["Dashboard"],
  "/dashboard/invitation": ["Undangan", "Undangan Saya"],
  "/dashboard/invitation/edit": ["Undangan", "Undangan Saya", "Edit"],
  "/dashboard/invitation/create": ["Undangan", "Buat Undangan"],
  "/dashboard/order": ["Order", "Order Saya"],
  "/dashboard/faq": ["Bantuan", "FAQ"],
};

export function BreadcrumbDynamic() {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbConfig[pathname] ?? [];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((title, idx) => (
          <React.Fragment key={`crumb-${idx}`}>
            {idx > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
