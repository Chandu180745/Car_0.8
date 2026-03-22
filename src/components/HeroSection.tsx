import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Shield, Gauge, Car, Zap, Brain, Database } from "lucide-react";

const stats = [
  { icon: Car, value: "1000+", label: "Cars", gradient: "from-rose-500/20 to-orange-500/20", iconColor: "text-rose-400" },
  { icon: Shield, value: "95%", label: "Accuracy", gradient: "from-emerald-500/20 to-green-500/20", iconColor: "text-emerald-400" },
  { icon: Gauge, value: "< 1s", label: "Speed", gradient: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { icon: Database, value: "5", label: "Features", gradient: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
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
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-4">
      {/* Parallax ambient blobs - colorful */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[120px] sm:blur-[180px] animate-parallax"
          style={{
            background: "radial-gradient(circle, hsl(340 80% 55% / 0.08), hsl(280 60% 55% / 0.04))",
            top: `calc(15% + ${mousePos.y * 30}px)`,
            left: `calc(10% + ${mousePos.x * 20}px)`,
          }}
        />
        <div
          className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[100px] sm:blur-[160px] animate-parallax-slow"
          style={{
            background: "radial-gradient(circle, hsl(200 80% 55% / 0.06), hsl(160 60% 55% / 0.03))",
            bottom: `calc(10% + ${(1 - mousePos.y) * 25}px)`,
            right: `calc(10% + ${(1 - mousePos.x) * 20}px)`,
          }}
        />
        <div
          className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full blur-[100px] sm:blur-[140px] animate-parallax"
          style={{
            background: "radial-gradient(circle, hsl(40 80% 55% / 0.05), hsl(20 60% 55% / 0.03))",
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
          className="absolute pointer-events-none opacity-[0.05] animate-parallax"
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
          <div className="glass-card px-6 py-3 rounded-full text-sm text-emerald-400 border-emerald-500/30">
            <Sparkles className="w-4 h-4 inline mr-2" />
            🚗 Easter egg! KNN says you're Recommended! ⭐
          </div>
        </div>
      )}

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 animate-reveal-up leading-[1.05] cursor-default select-none"
          style={{ animationDelay: "100ms" }}
          onClick={handleTitleClick}
        >
          Car Intelligence
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400">System</span>
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-4 animate-reveal-up text-pretty leading-relaxed px-2" style={{ animationDelay: "200ms" }}>
          AI-powered car evaluation using K-Nearest Neighbors for smarter purchase decisions.
        </p>

        <div className="animate-reveal-up mb-6" style={{ animationDelay: "250ms" }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/40 backdrop-blur-sm border border-border/30 text-[11px] text-muted-foreground">
            <Brain className="w-3 h-3 text-violet-400" />
            KNN Classification • 5 Features • 3 Classes
          </span>
        </div>

        <div className="animate-reveal-up" style={{ animationDelay: "300ms" }}>
          <Button
            className="h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold hover:shadow-[0_0_30px_hsl(340_80%_55%/0.35)] active:scale-[0.97] transition-all duration-300 backdrop-blur-sm border border-white/10"
            onClick={() => document.getElementById("predict-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-10 sm:mt-16 animate-reveal-up flex-wrap px-2" style={{ animationDelay: "450ms" }}>
          {stats.map(({ icon: Icon, value, label, gradient, iconColor }) => (
            <div key={label} className={`glass-card flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full`}>
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <Icon className={`w-3 h-3 ${iconColor}`} />
              </div>
              <span className="text-xs sm:text-sm font-bold tabular-nums">{value}</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
