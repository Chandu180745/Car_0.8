import { Github, Linkedin, Mail, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const FooterSection = () => (
  <footer id="footer" className="py-16 px-4 pb-28">
    <div className="max-w-4xl mx-auto">
      <div className="section-border p-6 sm:p-10">
        <ScrollReveal className="text-center mb-8">
          <div className="pill-badge border-primary/20 bg-primary/5 mb-6 mx-auto">
            <span className="text-xs text-primary">📬 Contact & Credits</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Get In Touch</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Built as a Machine Learning project demonstrating KNN classification for car evaluation.
          </p>
        </ScrollReveal>

        {/* Contact icons */}
        <ScrollReveal delay={100}>
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            <a href="mailto:chandradeepreddy@gmail.com" className="pill-badge border-border/40 bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 active:scale-[0.96] px-4 py-2 gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-xs">Gmail</span>
            </a>
            <a href="tel:+91XXXXXXXXXX" className="pill-badge border-border/40 bg-secondary/50 text-muted-foreground hover:text-result-recommended hover:border-result-recommended/30 transition-all duration-200 active:scale-[0.96] px-4 py-2 gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-xs">Phone</span>
            </a>
            <a href="#" className="pill-badge border-border/40 bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 active:scale-[0.96] px-4 py-2 gap-2">
              <Github className="w-4 h-4" />
              <span className="text-xs">GitHub</span>
            </a>
            <a href="#" className="pill-badge border-border/40 bg-secondary/50 text-muted-foreground hover:text-result-good hover:border-result-good/30 transition-all duration-200 active:scale-[0.96] px-4 py-2 gap-2">
              <Linkedin className="w-4 h-4" />
              <span className="text-xs">LinkedIn</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Credits */}
        <ScrollReveal delay={200}>
          <div className="glass-card p-6 rounded-2xl text-center mb-8">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Project By</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div>
                <p className="font-bold text-foreground">A Chandradeep Reddy</p>
                <p className="pill-badge border-primary/20 bg-primary/5 text-primary text-[10px] mt-1 px-3 py-0.5">23311A67B0</p>
              </div>
              <span className="text-muted-foreground hidden sm:block">&</span>
              <div>
                <p className="font-bold text-foreground">Anuj Kushalappa</p>
                <p className="pill-badge border-result-good/20 bg-result-good/5 text-result-good text-[10px] mt-1 px-3 py-0.5">23311A67C6</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Car Intelligence System • KNN Classification Project
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </footer>
);

export default FooterSection;
