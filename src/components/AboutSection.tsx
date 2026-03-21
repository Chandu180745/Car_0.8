import ScrollReveal from "@/components/ScrollReveal";
import { Brain, Database, Gauge, ShieldCheck, Fuel, IndianRupee, Wrench, CheckCircle2 } from "lucide-react";

const pipeline = [
  { step: "01", title: "Data Collection", desc: "A curated dataset of 1000+ Indian cars with buying price, maintenance cost, engine HP, safety rating, and mileage.", icon: Database },
  { step: "02", title: "Data Preprocessing", desc: "Categorical values (Low/Medium/High) encoded to numerical values. Feature scaling normalizes all dimensions so no single feature dominates.", icon: Gauge },
  { step: "03", title: "KNN Model", desc: "KNN stores all data points. It doesn't 'train' traditionally — it memorizes the entire dataset for comparison.", icon: Brain },
  { step: "04", title: "Distance Calculation", desc: "For a new car, Euclidean distance is calculated against every known car to find the most similar ones.", icon: Gauge },
  { step: "05", title: "Neighbor Selection", desc: "The K nearest (most similar) cars are selected. K is tuned using cross-validation to balance bias and variance.", icon: ShieldCheck },
  { step: "06", title: "Majority Voting", desc: "The class that appears most among the K neighbors wins. Output = majority class (Poor / Good / Recommended).", icon: CheckCircle2 },
];

const features = [
  { icon: IndianRupee, name: "Buying Price", why: "Affordability" },
  { icon: Wrench, name: "Maintenance Cost", why: "Long-term expense" },
  { icon: Gauge, name: "Engine HP", why: "Performance" },
  { icon: ShieldCheck, name: "Safety Rating", why: "Risk factor" },
  { icon: Fuel, name: "Mileage", why: "Efficiency" },
];

const architectureSteps = [
  { label: "User Input", sub: "Car features entered" },
  { label: "Data Preprocessing", sub: "Encode & normalize" },
  { label: "Feature Scaling", sub: "Standardize dimensions" },
  { label: "KNN Model", sub: "Load training data" },
  { label: "Distance Computation", sub: "Euclidean distance" },
  { label: "Nearest Neighbors", sub: "Select K closest" },
  { label: "Majority Voting", sub: "Count class labels" },
  { label: "Final Output", sub: "Poor / Good / Recommended" },
];

const AboutSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A machine learning classification model using <span className="text-foreground font-medium">K-Nearest Neighbors (KNN)</span> that predicts whether a car is Poor, Good, or Recommended based on key attributes.
          </p>
        </ScrollReveal>

        {/* Pipeline - staggered cards */}
        <div className="mb-24">
          <ScrollReveal className="text-center mb-10">
            <h3 className="text-xl font-semibold">End-to-End Pipeline</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipeline.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="glass-card p-5 h-full group hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold border border-primary/20">
                      {item.step}
                    </span>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* System Architecture - Vertical Mindmap */}
        <div className="mb-24">
          <ScrollReveal className="text-center mb-10">
            <h3 className="text-xl font-semibold">System Architecture</h3>
          </ScrollReveal>
          <div className="max-w-md mx-auto">
            {architectureSteps.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 100}>
                <div className="flex flex-col items-center">
                  {/* Node */}
                  <div className={`w-full glass-card px-5 py-4 text-center group hover:border-primary/40 transition-all duration-300 ${
                    i === 0 ? "border-primary/30 glow-red" : i === architectureSteps.length - 1 ? "border-primary/30 glow-red" : ""
                  }`}>
                    <p className="font-semibold text-sm">{step.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{step.sub}</p>
                  </div>
                  {/* Connector */}
                  {i < architectureSteps.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-border/30" />
                      <div className="w-2 h-2 rounded-full border-2 border-primary/40 bg-background" />
                      <div className="w-px h-6 bg-gradient-to-b from-border/30 to-transparent" />
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
            <div className="inline-block px-6 py-4 rounded-xl bg-secondary/50 border border-border/50 mb-4">
              <p className="text-lg sm:text-xl font-mono text-foreground tracking-wide">
                d = √( Σ (x<sub>i</sub> − y<sub>i</sub>)² )
              </p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Euclidean distance measures how similar two cars are. The smaller the distance, the more similar.
            </p>
          </div>
        </ScrollReveal>

        {/* Feature Importance */}
        <div className="mb-24">
          <ScrollReveal className="text-center mb-8">
            <h3 className="text-xl font-semibold">Why These Features Matter</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {features.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 70} direction="scale">
                <div className="glass-card p-4 text-center group hover:border-primary/30 transition-all duration-300">
                  <f.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.why}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Strengths only */}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
            <div className="mt-5 inline-block px-4 py-2 rounded-full bg-secondary border border-border/50 text-xs text-muted-foreground font-mono tracking-wide">
              INPUT → DISTANCE → NEIGHBORS → VOTE → OUTPUT
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
