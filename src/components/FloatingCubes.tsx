import { useEffect, useState, memo, useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";

const CUBE_COUNT = 35;

interface CubeData {
  id: number;
  x: number;
  size: number;
  borderColor: string;
  glowColor: string;
  bgColor: string;
  shadowColor: string;
  fallDuration: number;
  fallDelay: number;
  rotateSpeed: number;
  parallaxSpeed: number;
  opacity: number;
}

// Vibrant neon color palette
const neonColors = [
  { border: "rgba(0,255,136,0.6)",   glow: "rgba(0,255,136,0.25)",   bg: "rgba(0,255,136,0.08)",   shadow: "0 0 15px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)" },
  { border: "rgba(0,200,255,0.6)",   glow: "rgba(0,200,255,0.25)",   bg: "rgba(0,200,255,0.08)",   shadow: "0 0 15px rgba(0,200,255,0.4), 0 0 40px rgba(0,200,255,0.15)" },
  { border: "rgba(255,0,128,0.6)",   glow: "rgba(255,0,128,0.25)",   bg: "rgba(255,0,128,0.08)",   shadow: "0 0 15px rgba(255,0,128,0.4), 0 0 40px rgba(255,0,128,0.15)" },
  { border: "rgba(128,0,255,0.6)",   glow: "rgba(128,0,255,0.25)",   bg: "rgba(128,0,255,0.08)",   shadow: "0 0 15px rgba(128,0,255,0.4), 0 0 40px rgba(128,0,255,0.15)" },
  { border: "rgba(255,200,0,0.6)",   glow: "rgba(255,200,0,0.25)",   bg: "rgba(255,200,0,0.08)",   shadow: "0 0 15px rgba(255,200,0,0.4), 0 0 40px rgba(255,200,0,0.15)" },
  { border: "rgba(255,80,80,0.6)",   glow: "rgba(255,80,80,0.25)",   bg: "rgba(255,80,80,0.08)",   shadow: "0 0 15px rgba(255,80,80,0.4), 0 0 40px rgba(255,80,80,0.15)" },
  { border: "rgba(0,255,255,0.6)",   glow: "rgba(0,255,255,0.25)",   bg: "rgba(0,255,255,0.08)",   shadow: "0 0 15px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.15)" },
  { border: "rgba(255,100,255,0.6)", glow: "rgba(255,100,255,0.25)", bg: "rgba(255,100,255,0.08)", shadow: "0 0 15px rgba(255,100,255,0.4), 0 0 40px rgba(255,100,255,0.15)" },
];

const generateCubes = (): CubeData[] =>
  Array.from({ length: CUBE_COUNT }, (_, i) => {
    const color = neonColors[i % neonColors.length];
    return {
      id: i,
      x: Math.random() * 96 + 2, // 2-98% to avoid edge clipping
      size: 12 + Math.random() * 45,
      borderColor: color.border,
      glowColor: color.glow,
      bgColor: color.bg,
      shadowColor: color.shadow,
      fallDuration: 18 + Math.random() * 30,
      fallDelay: Math.random() * 20,
      rotateSpeed: 8 + Math.random() * 20,
      parallaxSpeed: (Math.random() - 0.5) * 0.15,
      opacity: 0.15 + Math.random() * 0.35,
    };
  });

const FallingCube = memo(({ cube, scrollVelocity }: { cube: CubeData, scrollVelocity: any }) => {
  const { scrollY } = useScroll();
  const scrollParallax = useTransform(scrollY, [0, 8000], [0, 8000 * cube.parallaxSpeed]);
  
  // React to velocity: falling faster and rotating more when scrolling
  const velocityY = useTransform(scrollVelocity, [-2000, 0, 2000], [200, 0, -200]);
  const velocityRotate = useTransform(scrollVelocity, [-2000, 0, 2000], [-45, 0, 45]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${cube.x}%`,
        width: cube.size,
        height: cube.size,
        y: scrollParallax,
        top: "-15%", // Start above viewport
        perspective: 800,
      }}
      animate={{
        top: ["-10%", "110%"],
      }}
      transition={{
        top: {
          duration: cube.fallDuration,
          repeat: Infinity,
          ease: "linear",
          delay: cube.fallDelay,
        },
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: cube.bgColor,
          borderRadius: cube.size > 30 ? "8px" : "5px",
          border: `1.5px solid ${cube.borderColor}`,
          boxShadow: cube.shadowColor,
          opacity: cube.opacity,
          transformStyle: "preserve-3d" as const,
          rotateX: velocityRotate,
          y: velocityY,
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180],
        }}
        transition={{
          rotateX: { duration: cube.rotateSpeed, repeat: Infinity, ease: "linear" },
          rotateY: { duration: cube.rotateSpeed * 1.3, repeat: Infinity, ease: "linear" },
          rotateZ: { duration: cube.rotateSpeed * 2, repeat: Infinity, ease: "linear" },
        }}
      />
    </motion.div>
  );
});

FallingCube.displayName = "FallingCube";

const FloatingCubes = () => {
  const [cubes, setCubes] = useState<CubeData[]>([]);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setCubes(generateCubes());
  }, []);

  if (cubes.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {cubes.map((cube) => (
        <FallingCube key={cube.id} cube={cube} scrollVelocity={smoothVelocity} />
      ))}
    </div>
  );
};

export default FloatingCubes;
