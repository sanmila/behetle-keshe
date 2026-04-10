import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStory from "./components/BrandStory";
import NewArrivals from "./components/NewArrivals";
import MarqueeStrip from "./components/MarqueeStrip";
import WomenCollection from "./components/WomenCollection";
import Collections from "./components/Collections";
import OversizedSection from "./components/OversizedSection";
import About from "./components/About";
import InstagramSection from "./components/InstagramSection";
import TrustStrip from "./components/TrustStrip";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#FFFBFC]">
      <Navbar />
      <Hero />
      <BrandStory />
      <NewArrivals />
      <MarqueeStrip />
      <WomenCollection />
      <Collections />
      <OversizedSection />
      <About />
      <InstagramSection />
      <TrustStrip />
      <Newsletter />
      <Footer />
    </main>
  );
}