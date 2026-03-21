import { XCircle, ThumbsUp, Star, Car } from "lucide-react";
import { CarMatch } from "@/lib/carMatcher";

interface ResultCardProps {
  prediction: string;
  matches?: CarMatch[];
}

const configs: Record<string, { icon: typeof XCircle; color: string; glow: string; bg: string; label: string; desc: string }> = {
  Poor: {
    icon: XCircle,
    color: "text-result-poor",
    glow: "glow-red",
    bg: "bg-result-poor/10 border-result-poor/30",
    label: "Poor",
    desc: "This car scores below average on the evaluated criteria. Consider alternatives with better value.",
  },
  Good: {
    icon: ThumbsUp,
    color: "text-result-good",
    glow: "glow-blue",
    bg: "bg-result-good/10 border-result-good/30",
    label: "Good",
    desc: "A solid choice with balanced specs. This car meets most practical requirements effectively.",
  },
  Recommended: {
    icon: Star,
    color: "text-result-recommended",
    glow: "glow-green",
    bg: "bg-result-recommended/10 border-result-recommended/30",
    label: "Recommended",
    desc: "Excellent pick! This car excels across all evaluated dimensions. Highly recommended.",
  },
};

const ResultCard = ({ prediction, matches = [] }: ResultCardProps) => {
  const cfg = configs[prediction] || configs.Good;
  const Icon = cfg.icon;

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border p-6 sm:p-8 text-center animate-reveal-up ${cfg.bg} ${cfg.glow}`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${cfg.bg} mb-4`}>
          <Icon className={`w-8 h-8 ${cfg.color}`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${cfg.color}`}>{cfg.label}</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">{cfg.desc}</p>
      </div>

      {matches.length > 0 && (
        <div className="animate-reveal-up" style={{ animationDelay: "200ms" }}>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
            Most Similar Cars from Dataset
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {matches.map((car, i) => (
              <div
                key={`${car.name}-${i}`}
                className="glass-card p-4 animate-reveal-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Car className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold leading-tight">{car.name}</p>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{car.buyingPrice}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engine</span>
                    <span className="font-medium">{car.engineHP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Safety</span>
                    <span className="font-medium">{car.safetyRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mileage</span>
                    <span className="font-medium">{car.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="font-medium">{car.maintenanceCost}</span>
                  </div>
                </div>
                {car.technologies && (
                  <div className="mt-3 pt-2 border-t border-border/50">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{car.technologies}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
