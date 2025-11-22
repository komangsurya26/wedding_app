import "./globals.css";
import { ReactNode } from "react";

import { fontVariables } from "./font";
import { metadata as siteMetadata } from "./metadata";

import { UserProvider } from "@/src/providers/UserProvider";
import { Toaster } from "@/components/ui/sonner";
import { getProfile } from "@/src/lib/auth-actions";

export { siteMetadata as metadata };

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile } = await getProfile();
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className={`${fontVariables} antialiased`}>
        <UserProvider user={profile}>
          <main>{children}</main>
        </UserProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
