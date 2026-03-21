import HeroSection from "@/components/HeroSection";
import PredictSection from "@/components/PredictSection";
import DatasetExplorer from "@/components/DatasetExplorer";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import BottomNav from "@/components/BottomNav";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <PredictSection />
    <DatasetExplorer />
    <AboutSection />
    <FooterSection />
    <BottomNav />
  </div>
);

export default Index;
