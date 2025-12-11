import "./globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";

import { fontVariables } from "./font";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Undangan Digital Bali | Tampil Dengan Design Elegan dan Eksklusif",
  description:
    "Buat undangan digital elegan dengan Resepsi Bali. Desain eksklusif, fitur RSVP, dan tampilan profesional untuk pernikahan Anda.",
  keywords: [
    "Undangan Digital Bali",
    "Tampil Dengan Design Elegan dan Eksklusif",
    "Desain Eksklusif",
    "Fitur RSVP",
    "Tampilan Profesional",
    "Pernikahan",
    "Undangan Digital Bali",
    "Resepsi Bali",
    "resepsibali",
    "Undangan Digital",
  ],
  openGraph: {
    title: "Resepsi Bali | Buat Undangan Website Digital",
    description:
      "Buat undangan digital elegan dengan Resepsi Bali. Desain eksklusif, fitur RSVP, dan tampilan profesional untuk pernikahan Anda.",
    siteName: "Resepsi Bali",
    url: "https://komangsuryasedana.web.id",
    type: "website",
    locale: "id-ID",
    images: [
      {
        url: "https://komangsuryasedana.web.id/favicon/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resepsi Bali - Undangan Digital Elegan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resepsi Bali | Buat Undangan Website Digital",
    description:
      "Buat undangan digital elegan dengan Resepsi Bali. Desain eksklusif, fitur RSVP, dan tampilan profesional untuk pernikahan Anda.",
    images: ["https://komangsuryasedana.web.id/favicon/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

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
