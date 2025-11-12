import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Karla,
  Marcellus,
  Bodoni_Moda,
  Lora,
  Great_Vibes,
  Caveat,
  Lato,
  Oranienbaum,
  Noto_Serif_Display,
} from "next/font/google";

import localFont from "next/font/local";

import "./globals.css";

const myFont1 = Cormorant_Garamond({
  variable: "--font-cormorantgaramond",
  subsets: ["latin"],
});

const myFont2 = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const myFont3 = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const myFont4 = Bodoni_Moda({
  variable: "--font-bodonimoda",
  subsets: ["latin"],
});

const myFont5 = localFont({
  src: "../public/fonts/BelgianoSerif.woff2",
  display: "swap",
  variable: "--font-belgiano",
});

const myFont6 = localFont({
  src: "../public/fonts/Thesignature.woff2",
  display: "swap",
  variable: "--font-signature",
});

const myFont7 = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const myFont8 = Great_Vibes({
  variable: "--font-greatvibes",
  subsets: ["latin"],
  weight: "400",
});

const myFont9 = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});
const myFont10 = Oranienbaum({
  variable: "--font-oranienbaum",
  weight: "400",
  subsets: ["latin"],
});
const myFont11 = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resepsi Bali - Jasa Pembuatan Website Undangan Digital Bali",
  description:
    "Buat undangan digital elegan dengan Resepsi Bali. Desain eksklusif, fitur RSVP, dan tampilan profesional untuk pernikahan Anda.",
  openGraph: {
    siteName: "Resepsi Bali",
    title: "Resepsi Bali - Jasa Pembuatan Website Undangan Digital Bali",
    description:
      "Buat undangan digital elegan dengan Resepsi Bali. Desain eksklusif, fitur RSVP, dan tampilan profesional untuk pernikahan Anda.",
    url: "https://komangsuryasedana.web.id",
    images: "https://komangsuryasedana.web.id/favicon/favicon-96x96.png",
    type: "website",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        className={`
          ${myFont1.variable} 
          ${myFont2.variable} 
          ${myFont3.variable} 
          ${myFont4.variable} 
          ${myFont5.variable} 
          ${myFont6.variable} 
          ${myFont7.variable} 
          ${myFont8.variable} 
          ${myFont9.variable} 
          ${myFont10.variable}
          ${myFont11.variable}
          antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
