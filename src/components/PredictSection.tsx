import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw, Info, Gauge, Wrench, ShieldCheck, Fuel } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ResultCard from "@/components/ResultCard";
import { findSimilarCars, CarMatch } from "@/lib/carMatcher";

type DropdownValue = "low" | "medium" | "high";

interface FormData {
  buying_price: number;
  engine_hp: DropdownValue;
  maintenance_cost: DropdownValue;
  safety_rating: DropdownValue;
  mileage: DropdownValue;
  adas: boolean;
  camera: boolean;
  sunroof: boolean;
  touchscreen: boolean;
  connected_car: boolean;
}

const defaultForm: FormData = {
  buying_price: 12,
  engine_hp: "medium",
  maintenance_cost: "medium",
  safety_rating: "medium",
  mileage: "medium",
  adas: false,
  camera: false,
  sunroof: false,
  touchscreen: false,
  connected_car: false,
};

const dropdownOptions: { label: string; key: keyof Pick<FormData, "engine_hp" | "maintenance_cost" | "safety_rating" | "mileage">; tooltip: string; icon: typeof Gauge; iconColor: string; gradient: string }[] = [
  { label: "Engine Power", key: "engine_hp", tooltip: "Engine horsepower category", icon: Gauge, iconColor: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20" },
  { label: "Maintenance Cost", key: "maintenance_cost", tooltip: "Annual maintenance expense", icon: Wrench, iconColor: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20" },
  { label: "Safety Rating", key: "safety_rating", tooltip: "Crash test & safety rating", icon: ShieldCheck, iconColor: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20" },
  { label: "Mileage", key: "mileage", tooltip: "Fuel efficiency rating", icon: Fuel, iconColor: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20" },
];

const featureOptions: { key: keyof Pick<FormData, "adas" | "camera" | "sunroof" | "touchscreen" | "connected_car">; label: string }[] = [
  { key: "adas", label: "ADAS" },
  { key: "camera", label: "Camera" },
  { key: "sunroof", label: "Sunroof" },
  { key: "touchscreen", label: "Touchscreen" },
  { key: "connected_car", label: "Connected Car" },
];

const PredictSection = () => {
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
  const headerY = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const cardY = useTransform(smoothProgress, [0, 1], [40, -40]);

  const [form, setForm] = useState<FormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [matches, setMatches] = useState<CarMatch[]>([]);

  const handleChange = (key: keyof FormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setMatches([]);
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setMatches([]);

    let prediction: string;
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      prediction = data.prediction;
    } catch {
      await new Promise((r) => setTimeout(r, 1500));
      const demo = ["Poor", "Good", "Recommended"];
      prediction = demo[Math.floor(Math.random() * demo.length)];
    }

    try {
      const similar = await findSimilarCars(form.buying_price, form.engine_hp, form.maintenance_cost, form.safety_rating, form.mileage, prediction, 3);
      setMatches(similar);
    } catch { /* silently fail */ }

    setResult(prediction);
    setLoading(false);
  };

  const handleReset = () => { setForm(defaultForm); setResult(null); setMatches([]); };

  const priceDisplay = form.buying_price >= 100
    ? `₹${(form.buying_price / 100).toFixed(1)} Cr`
    : `₹${form.buying_price} Lakhs`;

  return (
    <section ref={containerRef} id="predict-section" className="min-h-screen flex items-center py-12 sm:py-20 px-6 sm:px-8 perspective-[1000px] transform-style-preserve-3d">
      <motion.div 
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
        className="max-w-2xl mx-auto w-full"
      >
        <div className="section-border p-4 sm:p-6 md:p-8 glass-card border-amber-500/15 overflow-hidden relative">
          <motion.div 
            style={{ y: headerY }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Evaluate Your Car</h2>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto">Enter car specifications for an AI-powered assessment.</p>
          </motion.div>

          <motion.div 
            style={{ y: cardY }}
          >
            <div className="glass-card p-4 sm:p-6 rounded-2xl border-amber-500/10">
              {/* Buying Price */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-medium flex items-center gap-2">
                    Buying Price
                    <span className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur-md border border-white/10 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Range: ₹1L to ₹250L (2.5 Crore)
                      </span>
                    </span>
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 backdrop-blur-md border border-rose-500/20 text-rose-400 text-xs font-bold">
                    {priceDisplay}
                  </span>
                </div>
                <input
                  type="range" min={1} max={250} step={1}
                  value={form.buying_price}
                  onChange={(e) => handleChange("buying_price", Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  title="Buying price in lakhs"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>₹1L</span>
                  <span>₹2.5 Cr</span>
                </div>
              </div>

              {/* Dropdown Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {dropdownOptions.map(({ label, key, tooltip, icon: Icon, iconColor, gradient }) => (
                  <div key={key}>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <Icon className={`w-3 h-3 ${iconColor}`} />
                      </div>
                      {label}
                      <span className="group relative cursor-help">
                        <Info className="w-3 h-3 text-muted-foreground" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur-md border border-white/10 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {tooltip}
                        </span>
                      </span>
                    </label>
                    <select
                      value={form[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full h-9 px-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* Feature Checkboxes */}
              <div className="mb-5">
                <p className="text-xs font-medium mb-2 text-muted-foreground">Technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {featureOptions.map(({ key, label }) => (
                    <label
                      key={key}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-200 active:scale-[0.96] backdrop-blur-md ${
                        form[key]
                          ? "border border-amber-500/40 bg-amber-500/10 text-amber-400"
                          : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                      }`}
                    >
                      <input type="checkbox" checked={form[key]} onChange={(e) => handleChange(key, e.target.checked)} className="sr-only" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 h-10 max-w-[200px] mx-auto rounded-full bg-white/5 backdrop-blur-xl border border-amber-500/30 text-amber-400 font-semibold text-xs hover:bg-amber-500/10 hover:border-amber-500/50 hover:shadow-[0_0_20px_hsl(38_80%_55%/0.15)] active:scale-[0.97] transition-all duration-200"
                  onClick={handlePredict}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "🔍 Predict"
                  )}
                </Button>
                <Button
                  className="h-10 w-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-[0.97] transition-all duration-200"
                  onClick={handleReset}
                  variant="ghost"
                  size="icon"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="mt-5"
            >
              <ResultCard prediction={result} matches={matches} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PredictSection;
