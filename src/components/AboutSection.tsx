import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IndianRupee, Wrench, Gauge, ShieldCheck, Fuel } from "lucide-react";

const features = [
  { icon: IndianRupee, name: "Buying Price", why: "Affordability", gradient: "from-rose-500/20 to-orange-500/20", iconColor: "text-rose-400" },
  { icon: Wrench, name: "Maintenance", why: "Long-term cost", gradient: "from-amber-500/20 to-yellow-500/20", iconColor: "text-amber-400" },
  { icon: Gauge, name: "Engine HP", why: "Performance", gradient: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { icon: ShieldCheck, name: "Safety", why: "Risk factor", gradient: "from-emerald-500/20 to-green-500/20", iconColor: "text-emerald-400" },
  { icon: Fuel, name: "Mileage", why: "Efficiency", gradient: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Tilt and Scale
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Internal Parallax
  const headerY = useTransform(smoothProgress, [0, 1], [-70, 70]);
  const gridY = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} id="how-it-works" className="min-h-screen flex items-center py-12 sm:py-20 px-6 sm:px-8 perspective-[1000px] transform-style-preserve-3d">
      <motion.div 
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
        className="max-w-4xl mx-auto w-full"
      >
        <div className="section-border p-4 sm:p-6 md:p-8 glass-card border-violet-500/15 overflow-hidden relative">
          <motion.div 
            style={{ y: headerY }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              A KNN classification model that predicts car quality based on key attributes.
            </p>
            <div className="mt-4 max-w-lg mx-auto">
              <div className="glass-card p-3 rounded-2xl border-violet-500/10 text-left">
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Goal:</span> Predict whether a car is Poor, Good, or Recommended based on Buying Price, Maintenance Cost, Engine Power, Safety Rating, and Mileage — helping users make informed purchasing decisions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature Importance */}
          <motion.div 
            style={{ y: gridY }}
          >
            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Why These Features Matter</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {features.map((f, i) => (
                <div key={f.name}>
                  <div className="glass-card p-3 text-center group hover:scale-[1.05] hover:border-violet-500/30 transition-all duration-300 border-violet-500/10 h-full">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mx-auto mb-2`}>
                      <f.icon className={`w-4 h-4 ${f.iconColor}`} />
                    </div>
                    <p className="text-xs font-medium mb-0.5">{f.name}</p>
                    <p className="text-[10px] text-muted-foreground">{f.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
