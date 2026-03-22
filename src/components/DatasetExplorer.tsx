import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Database, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CarRow {
  id: string;
  name: string;
  year: string;
  engineHP: string;
  buyingPrice: string;
  maintenanceCost: string;
  safetyRating: string;
  mileage: string;
  cls: string;
  technologies: string;
}

const PAGE_SIZE = 25;

const classColor: Record<string, string> = {
  Recommended: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Good: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  Poor: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

const DatasetExplorer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Scale and Opacity
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Internal Parallax
  const headerY = useTransform(smoothProgress, [0, 1], [-60, 60]);

  const [cars, setCars] = useState<CarRow[]>([]);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded && cars.length === 0) return;
    if (cars.length > 0) return;
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    fetch(`${baseUrl}/data/Cars_Dataset_KNN.csv`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load dataset");
        return r.text();
      })
      .then((text) => {
        const lines = text.trim().split("\n");
        const rows = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            id: v[0]?.trim(),
            name: (v[1]?.trim() ?? "").replace(/_/g, " "),
            year: v[2]?.trim(),
            engineHP: v[3]?.trim(),
            buyingPrice: v[4]?.trim(),
            maintenanceCost: v[5]?.trim(),
            safetyRating: v[6]?.trim(),
            mileage: v[7]?.trim(),
            cls: v[8]?.trim(),
            technologies: (v[9]?.trim() ?? "").replace(/\|/g, ", "),
          } as CarRow;
        });
        setCars(rows);
      })
      .catch((err) => {
        console.error("Dataset fetch error:", err);
      });
  }, [expanded, cars.length]);

  const totalPages = Math.ceil(cars.length / PAGE_SIZE);
  const pageData = cars.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <section ref={containerRef} id="dataset" className="h-full w-full pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        style={{ scale, opacity }}
        className="mx-auto w-full max-w-[1700px] transition-all duration-500 h-full flex flex-col py-2"
      >
        <div className="section-border p-6 sm:p-8 lg:p-10 glass-card border-cyan-500/15 overflow-hidden relative transition-all duration-500 flex flex-col h-full max-h-full">
          <motion.div 
            style={{ y: headerY }}
            className="text-center mb-6 shrink-0"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-1">Dataset Explorer</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-3 text-[10px] sm:text-xs">
              Browse the complete training dataset.
            </p>
            <Button
              className={`rounded-full gap-2 h-10 px-6 text-xs bg-white/5 backdrop-blur-xl border ${expanded ? "border-cyan-500/30 text-cyan-400" : "border-white/15 text-foreground"} hover:bg-white/10 active:scale-[0.97] transition-all`}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide Dataset" : "Explore Dataset"}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </Button>
          </motion.div>

          {expanded && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col flex-1 overflow-hidden min-h-0 mt-2 lg:mt-4"
            >
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2 min-h-0 pb-4" data-lenis-prevent>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-muted-foreground text-[9px] sm:text-[10px]">
                      <th className="font-medium p-1.5 sm:p-2">Model</th>
                      <th className="font-medium p-1.5 sm:p-2">Price</th>
                      <th className="font-medium p-1.5 sm:p-2 hidden sm:table-cell">Engine</th>
                      <th className="font-medium p-1.5 sm:p-2 hidden md:table-cell">Safety</th>
                      <th className="font-medium p-1.5 sm:p-2 hidden lg:table-cell">Mileage</th>
                      <th className="font-medium p-1.5 sm:p-2 hidden xl:table-cell truncate max-w-[120px]">Tech</th>
                      <th className="font-medium p-1.5 sm:p-2 text-right">Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((car, i) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: i * 0.015 }}
                        key={car.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default"
                      >
                       <td className="p-1.5 sm:p-2">
                          <p className="font-bold text-[10px] sm:text-xs text-foreground group-hover:text-cyan-400 transition-colors leading-tight">{car.name}</p>
                          <p className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5">{car.year}</p>
                       </td>
                       <td className="p-1.5 sm:p-2 text-[9px] sm:text-[10px] text-cyan-400 font-medium whitespace-nowrap">₹{car.buyingPrice}L</td>
                       <td className="p-1.5 sm:p-2 hidden sm:table-cell text-[9px] sm:text-[10px]">{car.engineHP}</td>
                       <td className="p-1.5 sm:p-2 hidden md:table-cell text-[9px] sm:text-[10px]">{car.safetyRating}</td>
                       <td className="p-1.5 sm:p-2 hidden lg:table-cell text-[9px] sm:text-[10px]">{car.mileage}</td>
                       <td className="p-1.5 sm:p-2 hidden xl:table-cell text-[8px] sm:text-[9px] text-muted-foreground truncate max-w-[150px]" title={car.technologies}>{car.technologies}</td>
                       <td className="p-1.5 sm:p-2 text-right">
                          <span className={`inline-block px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold border ${classColor[car.cls] ?? "bg-white/5 text-muted-foreground border-white/10"}`}>
                            {car.cls}
                          </span>
                       </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                  {cars.length === 0 && (
                    <div className="glass-card p-8 text-center rounded-2xl mt-4">
                      <p className="text-muted-foreground text-sm">No cars match your search.</p>
                    </div>
                  )}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 shrink-0 border-t border-white/5 pt-4">
                  <Button className="h-8 w-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground hover:bg-white/10" size="icon" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] text-muted-foreground tabular-nums">{page + 1} / {totalPages}</span>
                  <Button className="h-8 w-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground hover:bg-white/10" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] text-muted-foreground">{cars.length} results</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default DatasetExplorer;
