import { useEffect, useState } from "react";
import { Car, Brain, BarChart3, MessageSquare, Database } from "lucide-react";

const sections = [
  { id: "hero", icon: Car, label: "Home", color: "text-rose-400", activeBg: "from-rose-500 to-rose-600" },
  { id: "predict-section", icon: BarChart3, label: "Predict", color: "text-amber-400", activeBg: "from-amber-500 to-orange-500" },
  { id: "dataset", icon: Database, label: "Dataset", color: "text-cyan-400", activeBg: "from-cyan-500 to-blue-500" },
  { id: "how-it-works", icon: Brain, label: "How It Works", color: "text-violet-400", activeBg: "from-violet-500 to-purple-500" },
  { id: "footer", icon: MessageSquare, label: "Contact", color: "text-emerald-400", activeBg: "from-emerald-500 to-green-500" },
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
    <nav className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
      <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-card/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        {sections.map(({ id, icon: Icon, label, color, activeBg }) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            title={label}
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 active:scale-[0.95] ${
              active === id
                ? `bg-gradient-to-br ${activeBg} text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]`
                : `${color} hover:bg-white/5`
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
