import { XCircle, ThumbsUp, Star } from "lucide-react";

interface ResultCardProps {
  prediction: string;
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

const ResultCard = ({ prediction }: ResultCardProps) => {
  const cfg = configs[prediction] || configs.Good;
  const Icon = cfg.icon;

  return (
    <div className={`rounded-2xl border p-6 sm:p-8 text-center animate-reveal-up ${cfg.bg} ${cfg.glow}`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${cfg.bg} mb-4`}>
        <Icon className={`w-8 h-8 ${cfg.color}`} />
      </div>
      <h3 className={`text-2xl font-bold mb-2 ${cfg.color}`}>{cfg.label}</h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">{cfg.desc}</p>
    </div>
  );
};

export default ResultCard;
