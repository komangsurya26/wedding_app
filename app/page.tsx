import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Template from "@/app/components/Template";
import Creation from "@/app/components/Creation";
import Feature from "@/app/components/Feature";
import Footer from "@/app/components/Footer";


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
