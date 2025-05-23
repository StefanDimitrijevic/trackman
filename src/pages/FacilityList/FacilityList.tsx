import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Facility } from "../../types/facilities";
import LocationMarker from "../../assets/location-marker.svg";
import TrashCan from "../../assets/trashcan.svg";
import StatusBadge from "../../components/StatusBadge/StatusBadge";

const initialFacilities: Facility[] = [
  {
    id: "1",
    name: "Sunset Golf Club",
    address: "123 Palm Drive, LA",
    description: "A scenic course near the beach.",
    imageUrl: "https://picsum.photos/seed/golf1/400/300",
    isDefault: true,
    openingHour: "08:00",
    closingHour: "20:00",
  },
  {
    id: "2",
    name: "Mountain Range Golf",
    address: "456 Alpine Road, CO",
    description: "Challenging course with mountain views.",
    imageUrl: "https://picsum.photos/seed/golf2/400/300",
    isDefault: false,
    openingHour: "07:00",
    closingHour: "23:45",
  },
  {
    id: "3",
    name: "Lakeside Greens",
    address: "789 Lake Ave, MN",
    description: "Water hazards and beautiful lake views.",
    imageUrl: "https://picsum.photos/seed/golf3/400/300",
    isDefault: false,
    openingHour: "06:30",
    closingHour: "21:00",
  },
  {
    id: "4",
    name: "Desert Dunes Club",
    address: "321 Sandhill Blvd, AZ",
    description: "Hot days and fast greens.",
    imageUrl: "https://picsum.photos/seed/golf4/400/300",
    isDefault: false,
    openingHour: "07:30",
    closingHour: "18:30",
  },
  {
    id: "5",
    name: "Urban Swing Golf",
    address: "654 City Square, NY",
    description: "Modern facility in the heart of the city.",
    imageUrl: "https://picsum.photos/seed/golf5/400/300",
    isDefault: false,
    openingHour: "09:00",
    closingHour: "23:30",
  },
  {
    id: "6",
    name: "Ocean Breeze Club",
    address: "987 Coastline Dr, FL",
    description: "Windy seaside fairways.",
    imageUrl: "https://picsum.photos/seed/golf6/400/300",
    isDefault: false,
    openingHour: "08:00",
    closingHour: "23:30",
  },
];

const FacilityList: FC = () => {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);

  const handleDeleteFacility = (id: string) => {
    setFacilities((prev) => prev.filter((facility) => facility.id !== id));
  };

  const isFacilityOpen = (
    openingHour: string,
    closingHour: string
  ): boolean => {
    const now = new Date();
    const currentHour = now.getHours();

    const [openHour] = openingHour.split(":").map(Number);
    const [closeHour] = closingHour.split(":").map(Number);

    return currentHour >= openHour && currentHour < closeHour;
  };
  return (
    <div>
      <button onClick={() => navigate("/create")}>Create Facility</button>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {facilities.map((facility) => {
          const isOpen = isFacilityOpen(
            facility.openingHour,
            facility.closingHour
          );
          return (
            <div
              key={facility.id}
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                width: "348px",
              }}
            >
              <img
                src={facility.imageUrl}
                alt={facility.name}
                style={{ borderRadius: "4px", height: "195px", width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>{facility.name}</h4>
                <StatusBadge status={isOpen ? "Open" : "Closed"} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                  }}
                >
                  <img src={LocationMarker} alt="location" />
                  <p>{facility.address}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteFacility(facility.id)}
                  >
                    <img src={TrashCan} alt="delete-facility" />
                  </button>
                  <button
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 24px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/edit/${facility.id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <p>{facility.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilityList;
