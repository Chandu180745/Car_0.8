import { XCircle, ThumbsUp, Star, Car } from "lucide-react";
import { CarMatch } from "@/lib/carMatcher";

interface ResultCardProps {
  prediction: string;
  matches?: CarMatch[];
}

const configs: Record<string, { icon: typeof XCircle; gradient: string; borderColor: string; label: string; emoji: string; desc: string }> = {
  Poor: {
    icon: XCircle,
    gradient: "from-rose-500/10 to-red-500/10",
    borderColor: "border-rose-500/25",
    label: "Poor",
    emoji: "❌",
    desc: "Below average — consider alternatives.",
  },
  Good: {
    icon: ThumbsUp,
    gradient: "from-cyan-500/10 to-blue-500/10",
    borderColor: "border-cyan-500/25",
    label: "Good",
    emoji: "👍",
    desc: "Solid choice with balanced specs.",
  },
  Recommended: {
    icon: Star,
    gradient: "from-emerald-500/10 to-green-500/10",
    borderColor: "border-emerald-500/25",
    label: "Recommended",
    emoji: "⭐",
    desc: "Excellent pick across all dimensions!",
  },
};

const colorMap: Record<string, string> = {
  Poor: "text-rose-400",
  Good: "text-cyan-400",
  Recommended: "text-emerald-400",
};

const ResultCard = ({ prediction, matches = [] }: ResultCardProps) => {
  const cfg = configs[prediction] || configs.Good;
  const Icon = cfg.icon;

  return (
    <div className="space-y-3">
      {/* Main result - compact */}
      <div className={`glass-card rounded-2xl border ${cfg.borderColor} p-4 sm:p-5 text-center animate-reveal-up bg-gradient-to-br ${cfg.gradient}`}>
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} border ${cfg.borderColor} mb-2 animate-bounce-in`}>
          <Icon className={`w-5 h-5 ${colorMap[prediction]}`} />
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">{cfg.emoji}</span>
          <h3 className={`text-xl sm:text-2xl font-bold ${colorMap[prediction]}`}>{cfg.label}</h3>
        </div>
        <p className="text-muted-foreground text-[11px] sm:text-xs max-w-xs mx-auto">{cfg.desc}</p>
      </div>

      {/* Similar cars */}
      {matches.length > 0 && (
        <div className="animate-reveal-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px flex-1 bg-border/50" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] text-muted-foreground">
              <Car className="w-3 h-3" />
              Top 3 Matches
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {matches.map((car, i) => {
              const clsColor = colorMap[car.cls] || "text-foreground";
              const clsBorder = car.cls === "Recommended" ? "border-emerald-500/15" : car.cls === "Good" ? "border-cyan-500/15" : "border-rose-500/15";
              return (
                <div
                  key={`${car.name}-${i}`}
                  className={`glass-card p-3 animate-reveal-up group hover:scale-[1.02] transition-all duration-300 border ${clsBorder}`}
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${i === 0 ? "from-amber-500/30 to-yellow-500/30" : i === 1 ? "from-slate-300/20 to-slate-400/20" : "from-orange-600/20 to-orange-700/20"} flex items-center justify-center text-[9px] font-bold`}>
                      #{i + 1}
                    </div>
                    <p className="text-xs font-bold leading-tight group-hover:text-amber-400 transition-colors truncate">{car.name}</p>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    {[
                      { label: "Price", value: `₹${car.buyingPrice}L`, color: "text-rose-400" },
                      { label: "Engine", value: car.engineHP, color: "text-cyan-400" },
                      { label: "Safety", value: car.safetyRating, color: "text-emerald-400" },
                      { label: "Mileage", value: car.mileage, color: "text-violet-400" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={`px-2 py-0.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/5 text-[9px] font-medium ${color}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {car.technologies && (
                    <div className="mt-1.5 pt-1.5 border-t border-white/5 flex flex-wrap gap-1">
                      {car.technologies.split(", ").slice(0, 3).map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[8px] text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-1.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${clsBorder} ${clsColor}`}>
                      {car.cls === "Recommended" ? "⭐" : car.cls === "Good" ? "👍" : "❌"} {car.cls}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
