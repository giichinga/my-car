import carData from "../Data/car-data.json";
import VehicleCard from "../Components/VehicleCard";

export default function VehiclesPage() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {carData.vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onView={(v) => console.log("View", v.id)}
          onContact={(v) => console.log("Contact", v.id)}
          onInspect={(v) => console.log("Inspect", v.id)}
        />
      ))}
    </div>
  );
}