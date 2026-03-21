import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Shield, Gauge, Car, Zap, Brain, Database } from "lucide-react";

const stats = [
  { icon: Car, value: "1000+", label: "Cars Analyzed" },
  { icon: Shield, value: "95%", label: "Accuracy" },
  { icon: Gauge, value: "< 1s", label: "Prediction" },
  { icon: Database, value: "5", label: "Features" },
];

const floatingIcons = [
  { icon: Car, x: "10%", y: "20%", delay: 0, size: 20 },
  { icon: Zap, x: "85%", y: "15%", delay: 1.5, size: 16 },
  { icon: Brain, x: "75%", y: "75%", delay: 3, size: 18 },
  { icon: Shield, x: "15%", y: "70%", delay: 4.5, size: 14 },
  { icon: Gauge, x: "90%", y: "45%", delay: 2, size: 16 },
];

const HeroSection = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEaster, setShowEaster] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleTitleClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setShowEaster(true);
      setTimeout(() => setShowEaster(false), 3000);
      setClickCount(0);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Parallax ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-primary/6 rounded-full blur-[180px] animate-parallax"
          style={{
            top: `calc(15% + ${mousePos.y * 30}px)`,
            left: `calc(10% + ${mousePos.x * 20}px)`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[160px] animate-parallax-slow"
          style={{
            background: "hsl(210 60% 55% / 0.04)",
            bottom: `calc(10% + ${(1 - mousePos.y) * 25}px)`,
            right: `calc(10% + ${(1 - mousePos.x) * 20}px)`,
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[140px] animate-parallax"
          style={{
            background: "hsl(142 60% 45% / 0.03)",
            top: `calc(50% + ${mousePos.y * 15}px)`,
            right: `calc(30% + ${mousePos.x * 10}px)`,
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, x, y, delay, size }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-[0.06] animate-parallax"
          style={{ left: x, top: y, animationDelay: `${delay}s` }}
        >
          <Icon style={{ width: size, height: size }} />
        </div>
      ))}

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(0 0% 50%) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(0_0%_3%)_100%)]" />

      {/* Easter egg */}
      {showEaster && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in">
          <div className="pill-badge border-primary/40 bg-primary/10 px-6 py-3 text-sm text-primary">
            <Sparkles className="w-4 h-4" />
            🚗 You found the easter egg! KNN says you're Recommended! ⭐
          </div>
        </div>
      )}

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Badge */}
        <div className="pill-badge border-primary/20 bg-primary/5 mb-8 animate-reveal-up">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm text-primary font-medium tracking-wide">ML-Powered Classification</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-reveal-up leading-[1.05] cursor-default select-none"
          style={{ animationDelay: "100ms" }}
          onClick={handleTitleClick}
        >
          Car Intelligence
          <br />
          <span className="text-gradient">System</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-4 animate-reveal-up text-pretty leading-relaxed" style={{ animationDelay: "200ms" }}>
          AI-powered car evaluation using K-Nearest Neighbors for smarter purchase decisions.
        </p>

        {/* Project info pill */}
        <div className="animate-reveal-up mb-10" style={{ animationDelay: "250ms" }}>
          <div className="pill-badge border-border/40 bg-secondary/50 text-muted-foreground mx-auto">
            <Brain className="w-3 h-3" />
            <span className="text-[11px]">KNN Classification • 5 Features • 3 Classes</span>
          </div>
        </div>

        <div className="animate-reveal-up" style={{ animationDelay: "300ms" }}>
          <Button
            variant="hero"
            size="lg"
            className="h-13 px-8 text-base rounded-full animate-pulse-ring"
            onClick={() => document.getElementById("predict-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-16 animate-reveal-up flex-wrap" style={{ animationDelay: "450ms" }}>
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="pill-badge border-border/30 bg-secondary/30 gap-2 px-4 py-2">
              <Icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm sm:text-base font-bold tabular-nums">{value}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
