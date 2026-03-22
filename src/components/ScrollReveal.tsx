import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hiddenClass = direction === "left" ? "scroll-hidden-left"
      : direction === "right" ? "scroll-hidden-right"
      : direction === "scale" ? "scroll-hidden-scale"
      : "scroll-hidden";

    const visibleClass = direction === "left" ? "scroll-visible-left"
      : direction === "right" ? "scroll-visible-right"
      : direction === "scale" ? "scroll-visible-scale"
      : "scroll-visible";

    el.classList.add(hiddenClass);
    el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(visibleClass);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
