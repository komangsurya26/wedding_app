import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Template from "@/components/Template";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <main>
      <Navbar user={user} />
      <Hero />
      <Template />
      <Feature />
      <Footer />
    </main>
  );
}
