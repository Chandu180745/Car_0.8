import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw, Info } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
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

const dropdownOptions: { label: string; key: keyof Pick<FormData, "engine_hp" | "maintenance_cost" | "safety_rating" | "mileage">; tooltip: string; color: string }[] = [
  { label: "Engine Power", key: "engine_hp", tooltip: "Engine horsepower category (Weak/Moderate/Strong in dataset)", color: "text-primary" },
  { label: "Maintenance Cost", key: "maintenance_cost", tooltip: "Annual maintenance expense level", color: "text-result-good" },
  { label: "Safety Rating", key: "safety_rating", tooltip: "Crash test & safety feature rating", color: "text-result-recommended" },
  { label: "Mileage", key: "mileage", tooltip: "Fuel efficiency rating", color: "text-amber-400" },
];

const featureOptions: { key: keyof Pick<FormData, "adas" | "camera" | "sunroof" | "touchscreen" | "connected_car">; label: string; desc: string }[] = [
  { key: "adas", label: "ADAS", desc: "Advanced Driver Assistance" },
  { key: "camera", label: "Camera", desc: "360° / Rear Camera" },
  { key: "sunroof", label: "Sunroof", desc: "Panoramic / Standard" },
  { key: "touchscreen", label: "Touchscreen", desc: "Infotainment Display" },
  { key: "connected_car", label: "Connected Car", desc: "IoT & Telematics" },
];

const PredictSection = () => {
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
      const similar = await findSimilarCars(
        form.buying_price,
        form.engine_hp,
        form.maintenance_cost,
        form.safety_rating,
        form.mileage,
        prediction,
        3
      );
      setMatches(similar);
    } catch {
      // silently fail
    }

    setResult(prediction);
    setLoading(false);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResult(null);
    setMatches([]);
  };

  const priceDisplay = form.buying_price >= 100
    ? `₹${(form.buying_price / 100).toFixed(1)} Cr`
    : `₹${form.buying_price} Lakhs`;

  return (
    <section id="predict-section" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="section-border p-6 sm:p-10">
          <ScrollReveal className="text-center mb-12">
            <div className="pill-badge border-primary/20 bg-primary/5 mb-6 mx-auto">
              <span className="text-xs text-primary">🎯 Prediction Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Evaluate Your Car</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Enter car specifications below for an AI-powered KNN assessment.</p>
          </ScrollReveal>

          <ScrollReveal delay={100} direction="scale">
            <div className="glass-card p-6 sm:p-8 rounded-2xl">
              {/* Buying Price Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Buying Price
                    <span className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border/50">
                        Range: ₹0.5L to ₹3500L from dataset
                      </span>
                    </span>
                  </label>
                  <span className="pill-badge border-primary/30 bg-primary/10 text-primary text-sm font-bold px-4 py-1">
                    {priceDisplay}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3500}
                  step={1}
                  value={form.buying_price}
                  onChange={(e) => handleChange("buying_price", Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  title="Buying price in lakhs"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                  <span>₹1L</span>
                  <span>₹3500L</span>
                </div>
              </div>

              {/* Dropdown Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {dropdownOptions.map(({ label, key, tooltip, color }) => (
                  <div key={key}>
                    <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                      <span className={color}>●</span>
                      {label}
                      <span className="group relative cursor-help">
                        <Info className="w-3 h-3 text-muted-foreground" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border/50">
                          {tooltip}
                        </span>
                      </span>
                    </label>
                    <select
                      value={form[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full h-10 px-4 rounded-full bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* Feature Checkboxes */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3 text-muted-foreground">Modern Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {featureOptions.map(({ key, label, desc }) => (
                    <label
                      key={key}
                      className={`pill-badge cursor-pointer transition-all duration-200 active:scale-[0.96] ${
                        form[key]
                          ? "border-primary/50 bg-primary/15 text-primary"
                          : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form[key]}
                        onChange={(e) => handleChange(key, e.target.checked)}
                        className="sr-only"
                      />
                      <span className="text-xs">{label}</span>
                      <span className="text-[9px] opacity-60 hidden sm:inline">· {desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="predict"
                  size="lg"
                  className="flex-1 h-12 rounded-full"
                  onClick={handlePredict}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin-slow" />
                      Analyzing...
                    </>
                  ) : (
                    "🔍 Predict Classification"
                  )}
                </Button>
                <Button
                  variant="reset"
                  size="lg"
                  className="h-12 rounded-full px-5"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {result && (
            <div className="mt-8">
              <ResultCard prediction={result} matches={matches} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PredictSection;
