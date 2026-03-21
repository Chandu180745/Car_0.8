import { Button } from "@/components/ui/button";
import { Car, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[160px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(215 90% 56% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(215 90% 56% / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8 animate-reveal-up">
          <Car className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">ML-Powered Classification</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-reveal-up leading-[1.05]" style={{ animationDelay: "100ms" }}>
          Car Intelligence
          <br />
          <span className="text-gradient">System</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-reveal-up" style={{ animationDelay: "200ms" }}>
          AI-powered car evaluation using K-Nearest Neighbors for smarter purchase decisions.
        </p>

        <div className="animate-reveal-up" style={{ animationDelay: "300ms" }}>
          <Button
            variant="hero"
            size="lg"
            className="h-13 px-8 text-base rounded-xl animate-pulse-ring"
            onClick={() => document.getElementById("predict-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
