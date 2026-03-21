import ScrollReveal from "@/components/ScrollReveal";
import { Brain, Database, BarChart3 } from "lucide-react";

const AboutSection = () => {
  const items = [
    { icon: Database, title: "Dataset Driven", desc: "Trained on real car specification data with multiple feature dimensions." },
    { icon: Brain, title: "KNN Algorithm", desc: "K-Nearest Neighbors finds similar cars to classify new entries accurately." },
    { icon: BarChart3, title: "Instant Results", desc: "Get real-time classification with confidence-backed predictions." },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            This system uses K-Nearest Neighbors to classify cars based on similarity to known good, poor, and recommended vehicles.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80}>
              <div className="glass-card p-6 text-center group hover:border-primary/30 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
