import ScrollReveal from "@/components/ScrollReveal";
import { Brain, Database, Gauge, ShieldCheck, Fuel, IndianRupee, Wrench, CheckCircle2, Zap, BarChart3, Target } from "lucide-react";

const pipeline = [
  {
    step: "01",
    title: "Data Collection",
    icon: Database,
    desc: "A curated dataset of 1000+ Indian cars with attributes like buying price, maintenance cost, engine HP, safety rating, and mileage.",
    detail: "Includes cars from Tata, Maruti, Hyundai, Toyota, and luxury brands. Each car is labeled as Poor, Good, or Recommended.",
    gradient: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-400",
  },
  {
    step: "02",
    title: "Data Preprocessing",
    icon: Zap,
    desc: "Categorical values (Low/Medium/High) are encoded to numerical values (1/2/3) for mathematical computation.",
    detail: "Example: Engine HP 'High' → 3, Safety 'Low' → 1. This preserves ordinal relationships for distance computation.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
  },
  {
    step: "03",
    title: "Feature Scaling",
    icon: BarChart3,
    desc: "All features are normalized so no single dimension dominates the distance calculation.",
    detail: "StandardScaler transforms each feature to mean=0, std=1, ensuring fair comparison across different scales.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    step: "04",
    title: "KNN Model",
    icon: Brain,
    desc: "KNN is a 'lazy learner' — it stores all training data points instead of building an internal model.",
    detail: "Unlike neural networks, KNN memorizes the entire dataset and uses it directly during prediction.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
  },
  {
    step: "05",
    title: "Distance Calculation",
    icon: Target,
    desc: "Euclidean distance measures similarity between the new car and every car in the dataset.",
    detail: "d = √(Σ(xᵢ - yᵢ)²) — a car with similar price, HP, safety, mileage will have a small distance value.",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
  },
  {
    step: "06",
    title: "Neighbor Selection",
    icon: ShieldCheck,
    desc: "The K nearest (most similar) cars are selected. K is tuned using cross-validation.",
    detail: "Small K → overfitting. Large K → underfitting. Cross-validation picks the K with highest accuracy.",
    gradient: "from-sky-500/20 to-indigo-500/20",
    iconColor: "text-sky-400",
  },
  {
    step: "07",
    title: "Majority Voting",
    icon: CheckCircle2,
    desc: "The class that appears most among the K neighbors wins. Output = majority class.",
    detail: "If K=5 and 3 neighbors are 'Recommended', 1 'Good', 1 'Poor' → prediction is 'Recommended'.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
];

const features = [
  { icon: IndianRupee, name: "Buying Price", why: "Affordability", gradient: "from-rose-500/20 to-orange-500/20", iconColor: "text-rose-400" },
  { icon: Wrench, name: "Maintenance", why: "Long-term cost", gradient: "from-amber-500/20 to-yellow-500/20", iconColor: "text-amber-400" },
  { icon: Gauge, name: "Engine HP", why: "Performance", gradient: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { icon: ShieldCheck, name: "Safety", why: "Risk factor", gradient: "from-emerald-500/20 to-green-500/20", iconColor: "text-emerald-400" },
  { icon: Fuel, name: "Mileage", why: "Efficiency", gradient: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
];

const AboutSection = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="section-border p-4 sm:p-6 md:p-10">
          {/* Header */}
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              A KNN classification model that predicts car quality based on key attributes.
            </p>
            <div className="mt-4 max-w-lg mx-auto">
              <div className="glass-card p-3 sm:p-4 text-left">
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Goal:</span> Predict whether a car is Poor, Good, or Recommended based on Buying Price, Maintenance Cost, Engine Power, Safety Rating, and Mileage — helping users make informed purchasing decisions.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pipeline */}
          <div className="mb-12 sm:mb-16">
            <ScrollReveal className="text-center mb-8">
              <h3 className="text-lg sm:text-xl font-semibold">End-to-End Pipeline</h3>
            </ScrollReveal>
            <div className="space-y-3">
              {pipeline.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 60} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`glass-card p-4 sm:p-5 group transition-all duration-300 border-l-2 border-transparent hover:border-l-2`}
                    style={{ borderLeftColor: `hsl(${i * 50} 60% 50% / 0.4)` }}>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm`}>
                        <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold text-muted-foreground/60">
                            {item.step}
                          </span>
                          <h4 className="font-semibold text-xs sm:text-sm">{item.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/80 mb-1">{item.desc}</p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Feature Importance */}
          <div>
            <ScrollReveal className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">Why These Features Matter</h3>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {features.map((f, i) => (
                <ScrollReveal key={f.name} delay={i * 60} direction="scale">
                  <div className="glass-card p-3 sm:p-4 text-center group hover:scale-[1.02] transition-all duration-300">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mx-auto mb-2`}>
                      <f.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${f.iconColor}`} />
                    </div>
                    <p className="text-xs sm:text-sm font-medium mb-0.5">{f.name}</p>
                    <p className="text-[10px] text-muted-foreground">{f.why}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
