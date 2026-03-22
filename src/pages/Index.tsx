import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import PredictSection from "@/components/PredictSection";
import DatasetExplorer from "@/components/DatasetExplorer";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import BottomNav, { SectionID } from "@/components/BottomNav";
import IntroAnimation from "@/components/IntroAnimation";
import FloatingCubes from "@/components/FloatingCubes";

const Index = () => {
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionID>("hero");

  const handleComplete = useCallback(() => setReady(true), []);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.02, filter: "blur(4px)", transition: { duration: 0.3 } }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative flex flex-col">
      {!ready && <IntroAnimation onComplete={handleComplete} />}
      <FloatingCubes />
      
      <div className="relative z-10 flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-24" data-lenis-prevent>
        <AnimatePresence mode="wait">
          {activeSection === "hero" && (
            <motion.div key="hero" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <HeroSection onNavigate={(id: string) => setActiveSection(id as SectionID)} />
            </motion.div>
          )}
          {activeSection === "predict-section" && (
            <motion.div key="predict" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute top-0 left-0 w-full h-full overflow-y-auto" data-lenis-prevent>
              <PredictSection />
            </motion.div>
          )}
          {activeSection === "dataset" && (
            <motion.div key="dataset" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute top-0 left-0 w-full h-full">
              <DatasetExplorer />
            </motion.div>
          )}
          {activeSection === "how-it-works" && (
            <motion.div key="how-it-works" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute top-0 left-0 w-full h-full overflow-y-auto" data-lenis-prevent>
              <AboutSection />
            </motion.div>
          )}
          {activeSection === "footer" && (
            <motion.div key="footer" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto" data-lenis-prevent>
              <FooterSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav activeSection={activeSection} onNavigate={setActiveSection} />
    </div>
  );
};

export default Index;
