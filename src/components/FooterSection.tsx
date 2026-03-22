import { Github, Linkedin, Mail, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const FooterSection = () => (
  <footer id="footer" className="py-12 sm:py-16 px-4 pb-24 sm:pb-28">
    <div className="max-w-4xl mx-auto">
      <div className="section-border p-4 sm:p-6 md:p-10">
        <ScrollReveal className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Get In Touch</h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
            ML project demonstrating KNN classification for car evaluation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {[
              { href: "mailto:chandradeepreddy@gmail.com", icon: Mail, label: "Gmail", hoverColor: "hover:text-rose-400 hover:border-rose-500/30", gradient: "from-rose-500/20 to-orange-500/20" },
              { href: "tel:+91XXXXXXXXXX", icon: Phone, label: "Phone", hoverColor: "hover:text-emerald-400 hover:border-emerald-500/30", gradient: "from-emerald-500/20 to-green-500/20" },
              { href: "#", icon: Github, label: "GitHub", hoverColor: "hover:text-foreground hover:border-border", gradient: "from-slate-500/20 to-slate-400/20" },
              { href: "#", icon: Linkedin, label: "LinkedIn", hoverColor: "hover:text-cyan-400 hover:border-cyan-500/30", gradient: "from-cyan-500/20 to-blue-500/20" },
            ].map(({ href, icon: Icon, label, hoverColor, gradient }) => (
              <a key={label} href={href} className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass-card text-muted-foreground ${hoverColor} transition-all duration-200 active:scale-[0.96]`}>
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-xs">{label}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass-card p-4 sm:p-6 rounded-2xl text-center mb-6">
            <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-widest">Project By</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
              <div>
                <p className="font-bold text-sm text-foreground">A Chandradeep Reddy</p>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500/15 to-orange-500/15 border border-rose-500/20 text-rose-400 text-[10px] mt-1">23311A67B0</span>
              </div>
              <span className="text-muted-foreground hidden sm:block">&</span>
              <div>
                <p className="font-bold text-sm text-foreground">Anuj Kushalappa</p>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/20 text-cyan-400 text-[10px] mt-1">23311A67C6</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground">
            © {new Date().getFullYear()} Car Intelligence System • KNN Classification
          </p>
        </ScrollReveal>
      </div>
    </div>
  </footer>
);

export default FooterSection;
