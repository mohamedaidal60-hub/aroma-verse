import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MarketplacePreview from "@/components/MarketplacePreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MarketplacePreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
