import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Template from "./components/Template";
import Creation from "./components/Creation";
import Feature from "./components/Feature";
import Footer from "./components/Footer";

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
