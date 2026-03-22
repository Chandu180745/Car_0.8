import { useEffect, useState, useMemo, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, Database, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const PAGE_SIZE = 12;

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

  // 3D Tilt and Scale
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [12, 0, -12]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Internal Parallax
  const headerY = useTransform(smoothProgress, [0, 1], [-60, 60]);

  const [cars, setCars] = useState<CarRow[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [classFilter, setClassFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
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

  const filtered = useMemo(() => {
    let list = cars;
    if (classFilter !== "all") list = list.filter((c) => c.cls === classFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.technologies.toLowerCase().includes(q) ||
          c.year.includes(q)
      );
    }
    return list;
  }, [cars, search, classFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => setPage(0), [search, classFilter]);

  return (
    <section ref={containerRef} id="dataset" className="min-h-screen flex items-center py-12 sm:py-20 px-6 sm:px-8 perspective-[1000px] transform-style-preserve-3d">
      <motion.div 
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
        className="max-w-6xl mx-auto w-full"
      >
        <div className="section-border p-4 sm:p-6 md:p-8 glass-card border-cyan-500/15 overflow-hidden relative">
          <motion.div 
            style={{ y: headerY }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-[10px] text-cyan-400 mb-4">
              <Database className="w-3 h-3" />
              1000+ Cars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Dataset Explorer</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-4 text-xs sm:text-sm">
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
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="glass-card p-3 mb-3 rounded-2xl border-cyan-500/10">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cars..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 bg-white/5 backdrop-blur-md border-white/10 h-9 rounded-full text-xs"
                    />
                    {search && (
                      <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <Button
                    className="h-9 gap-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-muted-foreground hover:bg-white/10"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filter
                  </Button>
                </div>

                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-white/5 overflow-hidden"
                  >
                    {["all", "Recommended", "Good", "Poor"].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setClassFilter(cls)}
                        className={`px-3 py-1 rounded-full text-[10px] transition-all active:scale-[0.96] border backdrop-blur-md ${
                          classFilter === cls
                            ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                            : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cls === "all" ? "All" : cls}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {pageData.map((car, i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    key={car.id} 
                    className="glass-card p-3 hover:border-cyan-500/20 transition-all duration-300 group border-white/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <p className="font-bold text-xs truncate group-hover:text-cyan-400 transition-colors">{car.name}</p>
                        <p className="text-[10px] text-muted-foreground">₹{car.buyingPrice}L • {car.year}</p>
                      </div>
                      <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${classColor[car.cls] ?? "bg-white/5 text-muted-foreground border-white/10"}`}>
                        {car.cls}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {[
                        { label: "Engine", value: car.engineHP },
                        { label: "Safety", value: car.safetyRating },
                        { label: "Mileage", value: car.mileage },
                      ].map(({ label, value }) => (
                        <span key={label} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[8px] text-muted-foreground">
                          {label}: <span className="text-foreground font-medium">{value}</span>
                        </span>
                      ))}
                    </div>
                    {car.technologies && (
                      <p className="text-[9px] text-muted-foreground border-t border-white/5 pt-1.5 truncate">{car.technologies}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="glass-card p-8 text-center rounded-2xl">
                  <p className="text-muted-foreground text-sm">No cars match your search.</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button className="h-8 w-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground hover:bg-white/10" size="icon" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] text-muted-foreground tabular-nums">{page + 1} / {totalPages}</span>
                  <Button className="h-8 w-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground hover:bg-white/10" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] text-muted-foreground">{filtered.length} results</span>
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
