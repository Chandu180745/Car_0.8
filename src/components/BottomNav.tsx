import { Home, LineChart, Database, Cpu, Mail } from "lucide-react";
import { motion } from "framer-motion";

export type SectionID = "hero" | "predict-section" | "dataset" | "how-it-works" | "footer";

export const sections: { id: SectionID; icon: any; label: string; color: string; activeBg: string }[] = [
  { id: "hero", icon: Home, label: "Home", color: "text-rose-400", activeBg: "from-rose-500 to-rose-600" },
  { id: "predict-section", icon: LineChart, label: "Predict", color: "text-amber-400", activeBg: "from-amber-500 to-orange-500" },
  { id: "dataset", icon: Database, label: "Dataset", color: "text-cyan-400", activeBg: "from-cyan-500 to-blue-500" },
  { id: "how-it-works", icon: Cpu, label: "How It Works", color: "text-violet-400", activeBg: "from-violet-500 to-purple-500" },
  { id: "footer", icon: Mail, label: "Contact", color: "text-emerald-400", activeBg: "from-emerald-500 to-green-500" },
];

interface BottomNavProps {
  activeSection: SectionID;
  onNavigate: (id: SectionID) => void;
}

const BottomNav = ({ activeSection, onNavigate }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-3 py-3 rounded-full bg-background/60 backdrop-blur-3xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        {sections.map(({ id, icon: Icon, label, color, activeBg }) => {
          const isActive = activeSection === id;
          return (
            <motion.button
              key={id}
              onClick={() => onNavigate(id)}
              title={label}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.85 }}
              className={`relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full transition-colors duration-300 ${
                isActive ? "text-white" : `${color} hover:bg-white/5`
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${activeBg} shadow-[0_0_20px_rgba(255,255,255,0.15)] z-0`}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
              <Icon 
                className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300" 
                strokeWidth={2.5} 
              />
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
