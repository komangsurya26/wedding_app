import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Template from "./components/Template";
import Creation from "./components/Creation";
import Feature from "./components/Feature";
import Footer from "./components/Footer";

export async function generateMetadata() {
  const data = {
    title: "Resepsi Bali - Jasa Pembuatan Website Undangan Digital Bali",
    description:
      "Buat undangan digital elegan dengan Resepsi Bali. Desain eksklusif, fitur RSVP, dan tampilan profesional untuk pernikahan Anda.",
    url: "https://komangsuryasedana.web.id",
  };

  const imageUrl =
    "https://masdianastudio.com/wp-content/uploads/2025/10/Undangan-Digital-Lumier_1-1.jpg";

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      siteName: "Resepsi Bali",
      title: data.title,
      description: data.description,
      url: data.url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.png",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [imageUrl],
    },
  };
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Template />
      <Feature />
      <Footer />
    </main>
  );
}
