import { HeroSection } from "@/components/landingpage/hero-section-1";
import { Cta4 } from "@/components/cta";
import Navbar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";
export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <Cta4 />
      <Footer />
    </div>
  );
}
