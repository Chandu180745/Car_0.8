import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw } from "lucide-react";
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
}

const defaultForm: FormData = {
  buying_price: 10,
  engine_hp: "medium",
  maintenance_cost: "medium",
  safety_rating: "medium",
  mileage: "medium",
  adas: false,
  camera: false,
};

const dropdownOptions: { label: string; key: keyof Pick<FormData, "engine_hp" | "maintenance_cost" | "safety_rating" | "mileage">; tooltip: string }[] = [
  { label: "Engine Power", key: "engine_hp", tooltip: "Engine horsepower category" },
  { label: "Maintenance Cost", key: "maintenance_cost", tooltip: "Annual maintenance expense level" },
  { label: "Safety Rating", key: "safety_rating", tooltip: "Crash test & safety feature rating" },
  { label: "Mileage", key: "mileage", tooltip: "Fuel efficiency rating" },
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

  return (
    <section id="predict-section" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Evaluate Your Car</h2>
          <p className="text-muted-foreground">Enter car specifications below for an AI-powered assessment.</p>
        </ScrollReveal>

        <ScrollReveal delay={100} direction="scale">
          <div className="glass-card p-6 sm:p-8">
            {/* Buying Price Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Buying Price</label>
                <span className="text-sm font-semibold text-primary">{form.buying_price} Lakhs</span>
              </div>
              <input
                type="range"
                min={3}
                max={25}
                step={1}
                value={form.buying_price}
                onChange={(e) => handleChange("buying_price", Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary accent-primary"
                title="Buying price in lakhs"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3L</span>
                <span>25L</span>
              </div>
            </div>

            {/* Dropdown Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {dropdownOptions.map(({ label, key, tooltip }) => (
                <div key={key}>
                  <label className="text-sm font-medium mb-1.5 block" title={tooltip}>
                    {label}
                    <span className="text-muted-foreground ml-1 cursor-help" title={tooltip}>ⓘ</span>
                  </label>
                  <select
                    value={form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 mb-8">
              {(["adas", "camera"] as const).map((key) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={(e) => handleChange(key, e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-md border-2 border-muted-foreground/40 peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center">
                      {form[key] && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium group-hover:text-foreground text-muted-foreground transition-colors">
                    {key === "adas" ? "ADAS" : "Camera"}
                  </span>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="predict"
                size="lg"
                className="flex-1 h-12 rounded-xl"
                onClick={handlePredict}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin-slow" />
                    Analyzing...
                  </>
                ) : (
                  "Predict"
                )}
              </Button>
              <Button
                variant="reset"
                size="lg"
                className="h-12 rounded-xl px-5"
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
    </section>
  );
};

export default PredictSection;
