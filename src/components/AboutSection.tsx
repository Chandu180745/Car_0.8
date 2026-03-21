import ScrollReveal from "@/components/ScrollReveal";
import { Brain, Database, Gauge, ShieldCheck, Fuel, IndianRupee, Wrench, CheckCircle2, ArrowDown, Zap, BarChart3, Target } from "lucide-react";

const pipeline = [
  {
    step: "01",
    title: "Data Collection",
    icon: Database,
    color: "text-primary",
    borderColor: "border-primary/30",
    desc: "A curated dataset of 1000+ Indian cars with attributes like buying price, maintenance cost, engine HP, safety rating, and mileage.",
    detail: "The dataset includes cars from brands like Tata, Maruti, Hyundai, Toyota, and luxury manufacturers. Each car is labeled as Poor, Good, or Recommended based on overall value assessment.",
  },
  {
    step: "02",
    title: "Data Preprocessing",
    icon: Zap,
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
    desc: "Categorical values (Low/Medium/High) are encoded to numerical values (1/2/3) for mathematical computation.",
    detail: "Example: Engine HP 'High' → 3, Safety 'Low' → 1. This encoding preserves ordinal relationships. Text labels become numbers the algorithm can compute distances with.",
  },
  {
    step: "03",
    title: "Feature Scaling",
    icon: BarChart3,
    color: "text-result-good",
    borderColor: "border-result-good/30",
    desc: "All features are normalized so no single dimension dominates the distance calculation.",
    detail: "Without scaling, a buying price of ₹25L would overshadow a safety rating of 3. StandardScaler transforms each feature to have mean=0 and std=1, ensuring fair comparison.",
  },
  {
    step: "04",
    title: "KNN Model Loading",
    icon: Brain,
    color: "text-purple-400",
    borderColor: "border-purple-400/30",
    desc: "KNN is a 'lazy learner' — it stores all training data points instead of building an internal model.",
    detail: "Unlike neural networks or decision trees, KNN doesn't have a traditional 'training' phase. It memorizes the entire dataset and uses it directly during prediction. This makes it fast to train but slower to predict.",
  },
  {
    step: "05",
    title: "Distance Calculation",
    icon: Target,
    color: "text-primary",
    borderColor: "border-primary/30",
    desc: "Euclidean distance measures similarity between the new car and every car in the dataset.",
    detail: "The formula d = √(Σ(xᵢ - yᵢ)²) calculates the straight-line distance in multi-dimensional feature space. A car with similar price, HP, safety, mileage, and maintenance will have a small distance value.",
  },
  {
    step: "06",
    title: "Neighbor Selection",
    icon: ShieldCheck,
    color: "text-result-recommended",
    borderColor: "border-result-recommended/30",
    desc: "The K nearest (most similar) cars are selected. K is tuned using cross-validation.",
    detail: "Small K (e.g., 1-3) → model is sensitive to noise (overfitting). Large K (e.g., 50+) → model becomes too general (underfitting). Cross-validation tests multiple K values and picks the one with highest accuracy.",
  },
  {
    step: "07",
    title: "Majority Voting",
    icon: CheckCircle2,
    color: "text-result-recommended",
    borderColor: "border-result-recommended/30",
    desc: "The class that appears most among the K neighbors wins. Output = majority class.",
    detail: "If K=5 and 3 neighbors are 'Recommended', 1 is 'Good', 1 is 'Poor' → the prediction is 'Recommended'. In weighted KNN, closer neighbors get more voting power for improved accuracy.",
  },
];

const features = [
  { icon: IndianRupee, name: "Buying Price", why: "Affordability factor", color: "text-primary" },
  { icon: Wrench, name: "Maintenance", why: "Long-term expense", color: "text-amber-400" },
  { icon: Gauge, name: "Engine HP", why: "Performance level", color: "text-result-good" },
  { icon: ShieldCheck, name: "Safety", why: "Risk assessment", color: "text-result-recommended" },
  { icon: Fuel, name: "Mileage", why: "Fuel efficiency", color: "text-purple-400" },
];

const architectureSteps = [
  { label: "User Input", sub: "Car features entered", color: "border-primary/40 glow-red" },
  { label: "Data Preprocessing", sub: "Encode & normalize", color: "border-amber-400/30" },
  { label: "Feature Scaling", sub: "Standardize dimensions", color: "border-result-good/30" },
  { label: "KNN Model", sub: "Load training data", color: "border-purple-400/30" },
  { label: "Distance Computation", sub: "Euclidean distance", color: "border-primary/30" },
  { label: "Nearest Neighbors", sub: "Select K closest", color: "border-result-recommended/30" },
  { label: "Majority Voting", sub: "Count class labels", color: "border-amber-400/30" },
  { label: "Final Output", sub: "Poor / Good / Recommended", color: "border-primary/40 glow-red" },
];

const AboutSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="section-border p-6 sm:p-10">
          {/* Header */}
          <ScrollReveal className="text-center mb-20">
            <div className="pill-badge border-primary/20 bg-primary/5 mb-6 mx-auto">
              <Brain className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary">Machine Learning Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A classification model using <span className="text-foreground font-medium">K-Nearest Neighbors (KNN)</span> that predicts whether a car is Poor, Good, or Recommended based on key attributes.
            </p>
            {/* Project description pill */}
            <div className="mt-6 max-w-xl mx-auto">
              <div className="glass-card p-4 rounded-2xl text-left">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Problem Statement:</span> To develop a ML classification model using KNN that predicts car quality based on Buying Price, Maintenance Cost, Engine Power, Safety Rating, and Mileage — assisting users in making informed car purchasing decisions.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pipeline - detailed cards */}
          <div className="mb-24">
            <ScrollReveal className="text-center mb-10">
              <h3 className="text-xl font-semibold">End-to-End Pipeline</h3>
              <p className="text-xs text-muted-foreground mt-2">Each step explained in detail</p>
            </ScrollReveal>
            <div className="space-y-4">
              {pipeline.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`glass-card p-5 sm:p-6 group hover:${item.borderColor} transition-all duration-300 border-l-2 ${item.borderColor}`}>
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-secondary/80 border ${item.borderColor}`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="pill-badge border-border/30 bg-secondary/50 text-[10px] font-mono font-bold text-muted-foreground px-2 py-0.5">
                            STEP {item.step}
                          </span>
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                        </div>
                        <p className="text-sm text-foreground/80 mb-2">{item.desc}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* System Architecture - Vertical Mindmap */}
          <div className="mb-24">
            <ScrollReveal className="text-center mb-10">
              <h3 className="text-xl font-semibold">System Architecture</h3>
              <p className="text-xs text-muted-foreground mt-2">Visual flow of the classification pipeline</p>
            </ScrollReveal>
            <div className="max-w-sm mx-auto">
              {architectureSteps.map((step, i) => (
                <ScrollReveal key={step.label} delay={i * 100}>
                  <div className="flex flex-col items-center">
                    <div className={`w-full glass-card px-5 py-4 text-center group hover:border-primary/40 transition-all duration-300 border ${step.color}`}>
                      <p className="font-semibold text-sm">{step.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{step.sub}</p>
                    </div>
                    {i < architectureSteps.length - 1 && (
                      <div className="flex flex-col items-center py-1">
                        <div className="w-px h-5 bg-gradient-to-b from-primary/40 to-border/30" />
                        <ArrowDown className="w-3 h-3 text-primary/40" />
                        <div className="w-px h-5 bg-gradient-to-b from-border/30 to-transparent" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Distance Formula */}
          <ScrollReveal className="mb-24" direction="scale">
            <h3 className="text-xl font-semibold mb-6 text-center">Core Logic</h3>
            <div className="glass-card p-6 sm:p-8 text-center">
              <div className="inline-block px-8 py-5 rounded-2xl bg-secondary/50 border border-border/50 mb-4">
                <p className="text-lg sm:text-2xl font-mono text-foreground tracking-wide">
                  d = √( Σ (x<sub>i</sub> − y<sub>i</sub>)² )
                </p>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                Euclidean distance measures how similar two cars are. The smaller the distance, the more similar.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="pill-badge border-border/30 bg-secondary/30 text-[10px] text-muted-foreground">x = input car features</span>
                <span className="pill-badge border-border/30 bg-secondary/30 text-[10px] text-muted-foreground">y = dataset car features</span>
                <span className="pill-badge border-border/30 bg-secondary/30 text-[10px] text-muted-foreground">d = similarity score</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Feature Importance */}
          <div className="mb-24">
            <ScrollReveal className="text-center mb-8">
              <h3 className="text-xl font-semibold">Why These Features Matter</h3>
              <p className="text-xs text-muted-foreground mt-2">Each feature contributes to the overall car evaluation</p>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {features.map((f, i) => (
                <ScrollReveal key={f.name} delay={i * 70} direction="scale">
                  <div className="glass-card p-4 text-center group hover:border-primary/30 transition-all duration-300">
                    <f.icon className={`w-6 h-6 ${f.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium mb-1">{f.name}</p>
                    <p className="text-[10px] text-muted-foreground">{f.why}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <ScrollReveal className="mb-24" direction="left">
            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-5 h-5 text-result-recommended" />
                <h3 className="font-semibold text-lg">Strengths</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Simple and intuitive algorithm",
                  "Real-world car evaluation application",
                  "Easy to explain and interpret",
                  "No complex training phase required",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-result-recommended shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* In Simple Terms */}
          <ScrollReveal direction="scale">
            <div className="glass-card p-6 sm:p-8 text-center border-primary/20">
              <Brain className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-3">In Simple Terms</h3>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                "The model compares a new car with previously known cars. If most similar cars are labeled <span className="text-result-recommended font-medium">'Recommended'</span>, then the new car is also classified as <span className="text-result-recommended font-medium">'Recommended'</span>."
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {["INPUT", "DISTANCE", "NEIGHBORS", "VOTE", "OUTPUT"].map((step, i) => (
                  <span key={step} className="flex items-center gap-1">
                    <span className="pill-badge border-primary/20 bg-primary/5 text-[10px] text-primary font-mono px-3 py-1">
                      {step}
                    </span>
                    {i < 4 && <span className="text-muted-foreground text-xs">→</span>}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
