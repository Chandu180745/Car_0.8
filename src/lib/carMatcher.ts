export interface CarMatch {
  name: string;
  year: number;
  engineHP: string;
  buyingPrice: number;
  maintenanceCost: string;
  safetyRating: string;
  mileage: string;
  cls: string;
  technologies: string;
}

interface RawCar {
  Car_Name: string;
  Year: string;
  Engine_HP: string;
  Buying_Price_Lakh: string;
  Maintenance_Cost: string;
  Safety_Rating: string;
  Mileage: string;
  Class: string;
  Modern_Technologies: string;
}

const encodeLevel = (v: string): number => {
  const map: Record<string, number> = { low: 1, weak: 1, medium: 2, moderate: 2, high: 3, strong: 3 };
  return map[v.toLowerCase()] ?? 2;
};

let cachedCars: RawCar[] | null = null;

async function loadCars(): Promise<RawCar[]> {
  if (cachedCars) return cachedCars;
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const res = await fetch(`${baseUrl}/data/Cars_Dataset_KNN.csv`);
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  cachedCars = lines.slice(1).map((line) => {
    const vals = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h.trim()] = vals[i]?.trim() ?? ""));
    return obj as unknown as RawCar;
  });
  return cachedCars;
}

export async function findSimilarCars(
  buyingPrice: number,
  engineHP: string,
  maintenanceCost: string,
  safetyRating: string,
  mileage: string,
  prediction: string,
  count = 3
): Promise<CarMatch[]> {
  const cars = await loadCars();

  const inputVec = [
    buyingPrice,
    encodeLevel(engineHP),
    encodeLevel(maintenanceCost),
    encodeLevel(safetyRating),
    encodeLevel(mileage),
  ];

  const scored = cars
    .filter((c) => c.Class.toLowerCase() === prediction.toLowerCase())
    .map((c) => {
      const carVec = [
        parseFloat(c.Buying_Price_Lakh),
        encodeLevel(c.Engine_HP),
        encodeLevel(c.Maintenance_Cost),
        encodeLevel(c.Safety_Rating),
        encodeLevel(c.Mileage),
      ];
      const dist = Math.sqrt(carVec.reduce((sum, v, i) => sum + (v - inputVec[i]) ** 2, 0));
      return { car: c, dist };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count);

  return scored.map(({ car }) => ({
    name: car.Car_Name.replace(/_/g, " "),
    year: parseInt(car.Year),
    engineHP: car.Engine_HP,
    buyingPrice: parseFloat(car.Buying_Price_Lakh),
    maintenanceCost: car.Maintenance_Cost,
    safetyRating: car.Safety_Rating,
    mileage: car.Mileage,
    cls: car.Class,
    technologies: car.Modern_Technologies.replace(/\|/g, ", "),
  }));
}
