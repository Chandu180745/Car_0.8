import { useEffect, useState } from "react";
import { Car, Brain, BarChart3, MessageSquare, Database } from "lucide-react";

const sections = [
  { id: "hero", icon: Car, label: "Home" },
  { id: "predict-section", icon: BarChart3, label: "Predict" },
  { id: "dataset", icon: Database, label: "Dataset" },
  { id: "how-it-works", icon: Brain, label: "How It Works" },
  { id: "footer", icon: MessageSquare, label: "Contact" },
];

const BottomNav = () => {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border/60 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        {sections.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            title={label}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 active:scale-[0.95] ${
              active === id
                ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(215_90%_56%/0.4)]"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
