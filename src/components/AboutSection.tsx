import ScrollReveal from "@/components/ScrollReveal";
import { Database, Brain, BarChart3, Target, Gauge, ShieldCheck, Fuel, IndianRupee, Wrench, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

const pipeline = [
  { step: "1", title: "Data Collection", desc: "A curated dataset of 1000+ Indian cars with buying price, maintenance cost, engine HP, safety rating, and mileage." },
  { step: "2", title: "Data Preprocessing", desc: "Categorical values (Low/Medium/High) are encoded to numerical values. Feature scaling normalizes all dimensions so no single feature dominates." },
  { step: "3", title: "KNN Model", desc: "KNN stores all data points. It doesn't 'train' traditionally — it memorizes the entire dataset for comparison." },
  { step: "4", title: "Distance Calculation", desc: "For a new car, Euclidean distance is calculated against every known car to find the most similar ones." },
  { step: "5", title: "Neighbor Selection", desc: "The K nearest (most similar) cars are selected. K is tuned using cross-validation to avoid overfitting or underfitting." },
  { step: "6", title: "Majority Voting", desc: "The class that appears most among the K neighbors wins. If 3 of 5 neighbors are 'Recommended', the new car is classified as Recommended." },
];

const features = [
  { icon: IndianRupee, name: "Buying Price", why: "Affordability" },
  { icon: Wrench, name: "Maintenance Cost", why: "Long-term expense" },
  { icon: Gauge, name: "Engine HP", why: "Performance" },
  { icon: ShieldCheck, name: "Safety Rating", why: "Risk factor" },
  { icon: Fuel, name: "Mileage", why: "Efficiency" },
];

const strengths = [
  "Simple and intuitive algorithm",
  "Real-world car evaluation application",
  "Easy to explain and interpret",
  "No complex training phase required",
];

const limitations = [
  "Sensitive to irrelevant features",
  "Slow for very large datasets",
  "Requires proper feature scaling",
  "Choice of K is critical to accuracy",
];

const improvements = [
  "Optimize K using cross-validation",
  "Use weighted KNN — closer neighbors have more influence",
  "Compare with Decision Trees or SVM",
  "Deploy as a full-stack web app with Flask",
];

const AboutSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            To develop a machine learning classification model using the <span className="text-foreground font-medium">K-Nearest Neighbors (KNN)</span> algorithm that predicts whether a car is Poor, Good, or Recommended based on key attributes, assisting users in making informed car purchasing decisions.
          </p>
        </ScrollReveal>

        {/* Pipeline */}
        <ScrollReveal className="mb-20">
          <h3 className="text-xl font-semibold mb-8 text-center">End-to-End Pipeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipeline.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 70}>
                <div className="glass-card p-5 h-full group hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                      {item.step}
                    </span>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Architecture Flow */}
        <ScrollReveal className="mb-20">
          <h3 className="text-xl font-semibold mb-8 text-center">System Architecture</h3>
          <div className="glass-card p-6 sm:p-8 overflow-x-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 min-w-0">
              {["User Input", "Preprocessing", "Feature Scaling", "KNN Model", "Distance Calc", "K Neighbors", "Majority Vote", "Output"].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-primary whitespace-nowrap">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Distance Formula */}
        <ScrollReveal className="mb-20">
          <h3 className="text-xl font-semibold mb-6 text-center">Distance Calculation (Core Logic)</h3>
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="inline-block px-6 py-4 rounded-xl bg-secondary/50 border border-border/50 mb-4">
              <p className="text-lg sm:text-xl font-mono text-foreground tracking-wide">
                d = √( Σ (x<sub>i</sub> − y<sub>i</sub>)² )
              </p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Euclidean distance measures how similar two cars are by comparing all their feature values. The smaller the distance, the more similar the cars.
            </p>
          </div>
        </ScrollReveal>

        {/* Feature Importance */}
        <ScrollReveal className="mb-20">
          <h3 className="text-xl font-semibold mb-8 text-center">Why These Features Matter</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {features.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 60}>
                <div className="glass-card p-4 text-center group hover:border-primary/30 transition-colors duration-300">
                  <f.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.why}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={300}>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Together, these features define the overall value proposition of a car.
            </p>
          </ScrollReveal>
        </ScrollReveal>

        {/* Strengths, Limitations, Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          <ScrollReveal>
            <div className="glass-card p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-result-recommended" />
                <h3 className="font-semibold">Strengths</h3>
              </div>
              <ul className="space-y-2.5">
                {strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-result-recommended mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="glass-card p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-result-poor" />
                <h3 className="font-semibold">Limitations</h3>
              </div>
              <ul className="space-y-2.5">
                {limitations.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-result-poor mt-0.5">✗</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="glass-card p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Improvements</h3>
              </div>
              <ul className="space-y-2.5">
                {improvements.map((imp) => (
                  <li key={imp} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">→</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Real-Life Explanation */}
        <ScrollReveal>
          <div className="glass-card p-6 sm:p-8 text-center border-primary/20">
            <Brain className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-3">In Simple Terms</h3>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              "The model compares a new car with previously known cars. If most similar cars are labeled <span className="text-result-recommended font-medium">'Recommended'</span>, then the new car is also classified as <span className="text-result-recommended font-medium">'Recommended'</span>."
            </p>
            <div className="mt-4 inline-block px-4 py-2 rounded-full bg-secondary text-xs text-muted-foreground font-mono">
              INPUT → DISTANCE → NEIGHBORS → VOTE → OUTPUT
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
