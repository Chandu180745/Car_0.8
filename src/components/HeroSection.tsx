import { Button } from "@/components/ui/button";
import { Car, ChevronDown, Sparkles, Shield, Gauge } from "lucide-react";

const stats = [
  { icon: Car, value: "1000+", label: "Cars Analyzed" },
  { icon: Shield, value: "95%", label: "Accuracy" },
  { icon: Gauge, value: "< 1s", label: "Prediction" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Ambient layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-primary/6 rounded-full blur-[140px] animate-float" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[180px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(hsl(215 90% 56% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(215 90% 56% / 0.4) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(220_20%_4%)_100%)]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8 animate-reveal-up">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm text-primary font-medium">ML-Powered Classification</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-reveal-up leading-[1.05]" style={{ animationDelay: "100ms" }}>
          Car Intelligence
          <br />
          <span className="text-gradient">System</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-reveal-up text-pretty" style={{ animationDelay: "200ms" }}>
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

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mt-16 animate-reveal-up" style={{ animationDelay: "450ms" }}>
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-xl sm:text-2xl font-bold tabular-nums">{value}</span>
              </div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-reveal-up" style={{ animationDelay: "600ms" }}>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
