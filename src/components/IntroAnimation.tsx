import { useState, useEffect } from "react";

const CUBE_COUNT = 18;

interface Cube {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  rotateX: number;
  rotateY: number;
  delay: number;
}

const colors = [
  "rgba(244,63,94,0.25)", "rgba(59,130,246,0.2)", "rgba(16,185,129,0.2)",
  "rgba(245,158,11,0.22)", "rgba(139,92,246,0.2)", "rgba(6,182,212,0.22)",
  "rgba(236,72,153,0.2)", "rgba(34,197,94,0.2)", "rgba(249,115,22,0.2)",
];

const generateCubes = (): Cube[] =>
  Array.from({ length: CUBE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 200 - 100,
    size: 30 + Math.random() * 50,
    color: colors[i % colors.length],
    rotateX: Math.random() * 360,
    rotateY: Math.random() * 360,
    delay: Math.random() * 0.6,
  }));

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [cubes] = useState(generateCubes);
  const [phase, setPhase] = useState<"scatter" | "converge" | "done">("scatter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("converge"), 400);
    const t2 = setTimeout(() => setPhase("done"), 1800);
    const t3 = setTimeout(onComplete, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${phase === "converge" ? "opacity-0" : "opacity-100"}`}
      style={{ perspective: "800px" }}
    >
      {cubes.map((cube) => {
        const isConverge = phase === "converge";
        return (
          <div
            key={cube.id}
            className="absolute rounded-xl border border-white/10"
            style={{
              width: cube.size,
              height: cube.size,
              background: cube.color,
              backdropFilter: "blur(8px)",
              left: isConverge ? "50%" : `${cube.x}%`,
              top: isConverge ? "50%" : `${cube.y}%`,
              transform: isConverge
                ? `translate(-50%,-50%) perspective(600px) rotateX(0deg) rotateY(0deg) scale(0)`
                : `translate(-50%,-50%) perspective(600px) rotateX(${cube.rotateX}deg) rotateY(${cube.rotateY}deg) translateZ(${cube.z}px) scale(1)`,
              transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${cube.delay}s`,
              boxShadow: `0 0 20px ${cube.color}`,
            }}
          />
        );
      })}
      <h1
        className={`relative z-10 text-3xl sm:text-5xl font-bold tracking-tight transition-all duration-700 ${phase === "converge" ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
        style={{ transitionDelay: "0.2s" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400">
          Car Intelligence
        </span>
      </h1>
    </div>
  );
};

export default IntroAnimation;
