import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Template from "@/app/components/Template";
import Feature from "@/app/components/Feature";
import Footer from "@/app/components/Footer";

export default function HomePage() {
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
