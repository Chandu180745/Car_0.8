import { useEffect, useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Database, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

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
  Recommended: "bg-result-recommended/15 text-result-recommended border-result-recommended/30",
  Good: "bg-secondary text-foreground border-border",
  Poor: "bg-result-poor/15 text-result-poor border-result-poor/30",
};

const levelBadge: Record<string, string> = {
  Low: "bg-emerald-500/10 text-emerald-400",
  Weak: "bg-amber-500/10 text-amber-400",
  Medium: "bg-amber-500/10 text-amber-400",
  Moderate: "bg-amber-500/10 text-amber-400",
  High: "bg-rose-500/10 text-rose-400",
  Strong: "bg-emerald-500/10 text-emerald-400",
};

const DatasetExplorer = () => {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [classFilter, setClassFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded && cars.length === 0) return;
    if (cars.length > 0) return;
    fetch("/data/Cars_Dataset_KNN.csv")
      .then((r) => r.text())
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
    <section id="dataset" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <Database className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">1000+ Cars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Dataset Explorer</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Browse the complete training dataset. Search by name, year, or technology.
          </p>
          <Button
            variant={expanded ? "outline" : "hero"}
            size="lg"
            className="rounded-xl gap-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Dataset" : "Explore Dataset"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </Button>
        </ScrollReveal>

        {expanded && (
          <div className="animate-reveal-up">
            {/* Controls */}
            <div className="glass-card p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cars, years, or tech..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-secondary border-border/50 h-10"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="default"
                  className="h-10 gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              {showFilters && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
                  {["all", "Recommended", "Good", "Poor"].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setClassFilter(cls)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-[0.96] ${
                        classFilter === cls
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cls === "all" ? "All Classes" : cls}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pageData.map((car) => (
                <div
                  key={car.id}
                  className="glass-card p-4 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{car.name}</p>
                      <p className="text-xs text-muted-foreground">₹{car.buyingPrice}L</p>
                    </div>
                    <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${classColor[car.cls] ?? "bg-secondary text-muted-foreground"}`}>
                      {car.cls}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engine</span>
                      <span className={`px-1.5 rounded text-[10px] font-medium ${levelBadge[car.engineHP] ?? ""}`}>{car.engineHP}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Safety</span>
                      <span className={`px-1.5 rounded text-[10px] font-medium ${levelBadge[car.safetyRating] ?? ""}`}>{car.safetyRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mileage</span>
                      <span className={`px-1.5 rounded text-[10px] font-medium ${levelBadge[car.mileage] ?? ""}`}>{car.mileage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maint.</span>
                      <span className={`px-1.5 rounded text-[10px] font-medium ${levelBadge[car.maintenanceCost] ?? ""}`}>{car.maintenanceCost}</span>
                    </div>
                  </div>

                  {car.technologies && (
                    <p className="text-[10px] text-muted-foreground leading-relaxed border-t border-border/40 pt-2 truncate">
                      {car.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="glass-card p-12 text-center">
                <p className="text-muted-foreground">No cars match your search.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button variant="outline" size="icon" className="h-9 w-9" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground px-3 tabular-nums">{page + 1} / {totalPages}</span>
                <Button variant="outline" size="icon" className="h-9 w-9" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground ml-2">{filtered.length} results</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DatasetExplorer;
