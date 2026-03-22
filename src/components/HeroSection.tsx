import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Shield, Gauge, Car, Zap, Brain, Database } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const stats = [
  { icon: Car, value: "1000+", label: "Cars", gradient: "from-rose-500/20 to-orange-500/20", iconColor: "text-rose-400" },
  { icon: Shield, value: "95%", label: "Accuracy", gradient: "from-emerald-500/20 to-green-500/20", iconColor: "text-emerald-400" },
  { icon: Gauge, value: "< 1s", label: "Speed", gradient: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { icon: Database, value: "5", label: "Features", gradient: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
];

const floatingIcons = [
  { icon: Car, x: "10%", y: "20%", delay: 0, size: 20, parallaxSpeed: 0.15 },
  { icon: Zap, x: "85%", y: "15%", delay: 1.5, size: 16, parallaxSpeed: -0.1 },
  { icon: Brain, x: "75%", y: "75%", delay: 3, size: 18, parallaxSpeed: 0.2 },
  { icon: Shield, x: "15%", y: "70%", delay: 4.5, size: 14, parallaxSpeed: -0.15 },
  { icon: Gauge, x: "90%", y: "45%", delay: 2, size: 16, parallaxSpeed: 0.05 },
];

const HeroSection = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEaster, setShowEaster] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Parallax transforms based on scroll
  const yBg1 = useTransform(smoothY, [0, 1000], [0, 300]);
  const yBg2 = useTransform(smoothY, [0, 1000], [0, -200]);
  const yBg3 = useTransform(smoothY, [0, 1000], [0, 150]);
  
  const scaleBg = useTransform(smoothY, [0, 800], [1, 1.2]);
  const opacityContent = useTransform(smoothY, [0, 500], [1, 0]);
  const yContent = useTransform(smoothY, [0, 500], [0, 100]);
  const translateZContent = useTransform(smoothY, [0, 500], [0, -200]);
  const scaleContent = useTransform(smoothY, [0, 500], [1, 0.85]);

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
    <section ref={containerRef} id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-6 sm:px-8 perspective-[1000px]">
      {/* Parallax ambient blobs */}
      <div className="absolute inset-0 pointer-events-none transform-style-preserve-3d">
        <motion.div
          className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[120px] sm:blur-[180px]"
          style={{
            background: "radial-gradient(circle, hsl(340 80% 55% / 0.08), hsl(280 60% 55% / 0.04))",
            top: `calc(15% + ${mousePos.y * 30}px)`,
            left: `calc(10% + ${mousePos.x * 20}px)`,
            y: yBg1,
            scale: scaleBg,
          }}
        />
        <motion.div
          className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[100px] sm:blur-[160px]"
          style={{
            background: "radial-gradient(circle, hsl(200 80% 55% / 0.06), hsl(160 60% 55% / 0.03))",
            bottom: `calc(10% + ${(1 - mousePos.y) * 25}px)`,
            right: `calc(10% + ${(1 - mousePos.x) * 20}px)`,
            y: yBg2,
            scale: scaleBg,
          }}
        />
        <motion.div
          className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            background: "radial-gradient(circle, hsl(40 80% 55% / 0.05), hsl(20 60% 55% / 0.03))",
            top: `calc(50% + ${mousePos.y * 15}px)`,
            right: `calc(30% + ${mousePos.x * 10}px)`,
            y: yBg3,
            scale: scaleBg,
          }}
        />
      </div>

      {/* Floating icons with independent scroll parallax */}
      {floatingIcons.map(({ icon: Icon, x, y, delay, size, parallaxSpeed }, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const yIcon = useTransform(scrollY, [0, 1000], [0, 1000 * parallaxSpeed]);
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none opacity-[0.05] animate-parallax"
            style={{ 
              left: x, 
              top: y, 
              animationDelay: `${delay}s`,
              y: yIcon 
            }}
          >
            <Icon style={{ width: size, height: size }} />
          </motion.div>
        );
      })}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(0_0%_3%)_100%)] pointer-events-none" />

      {/* Easter egg */}
      {showEaster && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in">
          <div className="glass-card px-6 py-3 rounded-full text-sm text-emerald-400 border-emerald-500/30">
            <Sparkles className="w-4 h-4 inline mr-2" />
            🚗 Easter egg! KNN says you're Recommended! ⭐
          </div>
        </div>
      )}

      {/* Main Content with 3D fade-out on scroll */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto w-full px-4"
        style={{ 
          opacity: opacityContent,
          y: yContent,
          scale: scaleContent,
          z: translateZContent,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1] cursor-default select-none whitespace-nowrap"
          onClick={handleTitleClick}
        >
          Car Intelligence <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400">System</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-6 text-pretty leading-relaxed whitespace-nowrap sm:whitespace-normal"
        >
          AI-powered car evaluation using K-Nearest Neighbors for smarter purchase decisions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 backdrop-blur-md border border-white/10 text-xs text-muted-foreground">
            <Brain className="w-3.5 h-3.5 text-violet-400" />
            KNN Classification • 5 Features • 3 Classes
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            className="h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base rounded-full bg-white/5 backdrop-blur-xl text-foreground font-semibold border border-white/20 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_hsl(0_0%_100%/0.08)] active:scale-[0.97] transition-all duration-300"
            onClick={() => document.getElementById("predict-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
            <ChevronDown className="w-4 h-4 ml-2 animate-bounce flex-shrink-0" />
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-12 sm:mt-16 px-2" 
        >
          {stats.map(({ icon: Icon, value, label, gradient, iconColor }) => (
            <div key={label} className="glass-card flex items-center gap-3 px-4 py-2.5 rounded-full hover:scale-105 transition-transform cursor-default">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm sm:text-base font-bold tabular-nums text-foreground">{value}</span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
