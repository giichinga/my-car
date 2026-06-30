// Static filter option lists for the hero search panel.
// Swap these for live data (Supabase query, etc.) once the DB is connected —
// the hook below doesn't care where this data comes from.

export const MAKES = [
  "Toyota",
  "Mazda",
  "Subaru",
  "Mercedes-Benz",
  "Honda",
  "Nissan",
  "Volkswagen",
  "Mitsubishi",
];

// Model lists keyed by make — drives the "select make first" dependency
export const MODELS_BY_MAKE = {
  Toyota: ["Land Cruiser", "Hilux", "RAV4", "Corolla", "Prado", "Vitz"],
  Mazda: ["CX-5", "Demio", "Axela", "CX-3"],
  Subaru: ["Forester", "Outback", "Impreza", "XV"],
  "Mercedes-Benz": ["C200", "E200", "GLC", "GLE"],
  Honda: ["Vezel", "Fit", "CR-V", "Civic"],
  Nissan: ["X-Trail", "Note", "Navara", "Patrol"],
  Volkswagen: ["Golf", "Tiguan", "Passat"],
  Mitsubishi: ["Pajero", "Outlander", "ASX"],
};

export const LOCATIONS = ["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Eldoret"];

export const COLORS = [
  "White",
  "Black",
  "Silver",
  "Grey",
  "Blue",
  "Red",
  "Pearl White",
];

export const TRANSMISSIONS = ["Automatic", "Manual", "CVT"];

export const CONDITIONS = [
  { value: "all", label: "All" },
  { value: "foreign_used", label: "Foreign Used" },
  { value: "locally_used", label: "Locally Used" },
  { value: "brand_new", label: "Brand New" },
];