import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Template from "@/components/Template";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";

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
