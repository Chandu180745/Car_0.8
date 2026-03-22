import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import PredictSection from "@/components/PredictSection";
import DatasetExplorer from "@/components/DatasetExplorer";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import BottomNav from "@/components/BottomNav";
import IntroAnimation from "@/components/IntroAnimation";
import FloatingCubes from "@/components/FloatingCubes";

const Index = () => {
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  return (
    <div className="min-h-screen bg-background">
      {!ready && <IntroAnimation onComplete={handleComplete} />}
      <FloatingCubes />
      <div className="relative z-10">
        <HeroSection />
        <PredictSection />
        <DatasetExplorer />
        <AboutSection />
        <FooterSection />
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
