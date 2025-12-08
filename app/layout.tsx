import "./globals.css";
import { ReactNode } from "react";

import { fontVariables } from "./font";
import { metadata as siteMetadata } from "./metadata";

import { Toaster } from "@/components/ui/sonner";

export { siteMetadata as metadata };

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className={`${fontVariables} antialiased font-karla`}>
        <main>{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
