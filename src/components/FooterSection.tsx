import { useRef } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FooterSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Scale and Opacity
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Internal Parallax
  const contentY = useTransform(smoothProgress, [0, 1], [60, -60]);

  return (
    <footer ref={containerRef} id="footer" className="min-h-screen flex items-center py-10 sm:py-14 px-6 sm:px-8 pb-24 sm:pb-28">
      <motion.div 
        style={{ scale, opacity }}
        className="max-w-4xl mx-auto w-full"
      >
        <div className="section-border p-4 sm:p-6 md:p-8 glass-card border-emerald-500/15 overflow-hidden relative">
          <motion.div style={{ y: contentY }}>
            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Get In Touch</h2>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
                ML project demonstrating KNN classification for car evaluation.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
              {[
                { href: "mailto:chandradeepreddy@gmail.com", icon: Mail, label: "Gmail", color: "text-rose-400 border-rose-500/20 hover:bg-rose-500/10" },
                { href: "tel:+91XXXXXXXXXX", icon: Phone, label: "Phone", color: "text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10" },
                { href: "#", icon: Github, label: "GitHub", color: "text-foreground border-white/10 hover:bg-white/10" },
                { href: "#", icon: Linkedin, label: "LinkedIn", color: "text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10" },
              ].map(({ href, icon: Icon, label, color }) => (
                <a key={label} href={href} className={`inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-md border ${color} transition-all duration-200 active:scale-[0.96] text-xs`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <div className="glass-card p-4 rounded-2xl text-center mb-4 border-emerald-500/10">
              <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-widest">Project By</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
                <div>
                  <p className="font-bold text-sm text-foreground">Chandradeep Reddy</p>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/15 text-rose-400 text-[10px] mt-1">23311A67B0</span>
                </div>
                <span className="text-muted-foreground hidden sm:block">&</span>
                <div>
                  <p className="font-bold text-sm text-foreground">Anuj Kushalappa</p>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/15 text-cyan-400 text-[10px] mt-1">23311A67C6</span>
                </div>
              </div>
            </div>

            <p className="text-center text-[10px] text-muted-foreground">
              © {new Date().getFullYear()} Car Intelligence System • KNN Classification
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
