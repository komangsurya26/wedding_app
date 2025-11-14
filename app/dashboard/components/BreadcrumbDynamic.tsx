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
import Link from "next/link";

export default function BreadcrumbDynamic() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const title =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { title, href, isLast, index };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item) => (
          <React.Fragment key={`crumb-${item.index}`}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbPage className="text-black/50">
                  <Link href={item.href}>{item.title}</Link>
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
