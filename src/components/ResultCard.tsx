import { XCircle, ThumbsUp, Star, Car, Sparkles } from "lucide-react";
import { CarMatch } from "@/lib/carMatcher";

interface ResultCardProps {
  prediction: string;
  matches?: CarMatch[];
}

const configs: Record<string, { icon: typeof XCircle; color: string; glow: string; bg: string; label: string; emoji: string; desc: string }> = {
  Poor: {
    icon: XCircle,
    color: "text-result-poor",
    glow: "glow-red",
    bg: "bg-result-poor/10 border-result-poor/30",
    label: "Poor",
    emoji: "❌",
    desc: "This car scores below average on the evaluated criteria. Consider alternatives with better value.",
  },
  Good: {
    icon: ThumbsUp,
    color: "text-result-good",
    glow: "glow-blue",
    bg: "bg-result-good/10 border-result-good/30",
    label: "Good",
    emoji: "👍",
    desc: "A solid choice with balanced specs. This car meets most practical requirements effectively.",
  },
  Recommended: {
    icon: Star,
    color: "text-result-recommended",
    glow: "glow-green",
    bg: "bg-result-recommended/10 border-result-recommended/30",
    label: "Recommended",
    emoji: "⭐",
    desc: "Excellent pick! This car excels across all evaluated dimensions. Highly recommended.",
  },
};

const ResultCard = ({ prediction, matches = [] }: ResultCardProps) => {
  const cfg = configs[prediction] || configs.Good;
  const Icon = cfg.icon;

  return (
    <div className="space-y-6">
      {/* Main result */}
      <div className={`rounded-2xl border p-8 text-center animate-reveal-up ${cfg.bg} ${cfg.glow}`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${cfg.bg} mb-5 animate-bounce-in`}>
          <Icon className={`w-10 h-10 ${cfg.color}`} />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">{cfg.emoji}</span>
          <h3 className={`text-3xl font-bold ${cfg.color}`}>{cfg.label}</h3>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">{cfg.desc}</p>

        {/* Classification confidence pill */}
        <div className="mt-5">
          <div className={`pill-badge ${cfg.bg} mx-auto`}>
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-medium">KNN Majority Vote Result</span>
          </div>
        </div>
      </div>

      {/* Similar cars */}
      {matches.length > 0 && (
        <div className="animate-reveal-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border/50" />
            <span className="pill-badge border-border/30 bg-secondary/50 text-muted-foreground text-xs">
              <Car className="w-3 h-3" />
              Top 3 Similar Cars from Dataset
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {matches.map((car, i) => (
              <div
                key={`${car.name}-${i}`}
                className="glass-card p-5 animate-reveal-up hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                {/* Car name - BOLD */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">{car.name}</p>
                </div>

                {/* Specs */}
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Price", value: `₹${car.buyingPrice}L`, color: "text-primary" },
                    { label: "Engine", value: car.engineHP, color: "text-result-good" },
                    { label: "Safety", value: car.safetyRating, color: "text-result-recommended" },
                    { label: "Mileage", value: car.mileage, color: "text-amber-400" },
                    { label: "Maintenance", value: car.maintenanceCost, color: "text-muted-foreground" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{label}</span>
                      <span className={`pill-badge border-border/30 bg-secondary/50 text-[10px] px-2 py-0.5 font-medium ${color}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                {car.technologies && (
                  <div className="mt-3 pt-3 border-t border-border/40">
                    <div className="flex flex-wrap gap-1">
                      {car.technologies.split(", ").slice(0, 4).map((tech) => (
                        <span key={tech} className="pill-badge border-border/20 bg-secondary/30 text-[9px] px-2 py-0.5 text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Class badge */}
                <div className="mt-3">
                  <span className={`pill-badge text-[10px] font-semibold px-3 py-1 ${
                    car.cls === "Recommended" ? "border-result-recommended/30 bg-result-recommended/10 text-result-recommended"
                    : car.cls === "Good" ? "border-result-good/30 bg-result-good/10 text-result-good"
                    : "border-result-poor/30 bg-result-poor/10 text-result-poor"
                  }`}>
                    {car.cls === "Recommended" ? "⭐" : car.cls === "Good" ? "👍" : "❌"} {car.cls}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
