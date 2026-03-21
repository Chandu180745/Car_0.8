import { Github, Linkedin } from "lucide-react";

const FooterSection = () => (
  <footer id="footer" className="border-t border-border/50 py-8 px-4 pb-24">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Car Intelligence System</p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-foreground transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
