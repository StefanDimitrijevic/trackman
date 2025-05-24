import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Facility } from "../../types/facilities";
import LocationMarker from "../../assets/location-marker.svg";
import TrashCan from "../../assets/trashcan.svg";
import DefaultFacility from "../../assets/star.svg";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import { getFacilities, saveFacilities } from "../../data/facilityStore";

const FacilityList: FC = () => {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    const storedFacilities = getFacilities();
    setFacilities(storedFacilities);
  }, []);

  const handleDeleteFacility = (id: string) => {
    const facilitiesCopy = [...facilities];
    const deletedFacility = facilitiesCopy.find((f) => f.id === id);

    const updatedFacilities = facilitiesCopy.filter((f) => f.id !== id);

    // If the deleted facility was the default, assign the first remaining one to be the defauæt
    if (deletedFacility?.isDefault && updatedFacilities.length > 0) {
      updatedFacilities[0].isDefault = true;
    }

    setFacilities(updatedFacilities);
    saveFacilities(updatedFacilities);
  };

  const isFacilityOpen = (
    openingHour: string,
    closingHour: string
  ): boolean => {
    const now = new Date();
    // calculate number of minutes since midnight of the current day
    const currentMinutesSinceMidnight = now.getHours() * 60 + now.getMinutes();

    // Split "HH:MM" into [hour, minute], convert to numbers, and assign via destructuring.
    const [openH, openM] = openingHour.split(":").map(Number);
    const [closeH, closeM] = closingHour.split(":").map(Number);

    const openingTimeInMinutes = openH * 60 + openM;
    const closingTimeInMinutes = closeH * 60 + closeM;

    // Case 1: Opening and closing hours are on the same day (e.g. 09:00 – 17:00)
    if (openingTimeInMinutes < closingTimeInMinutes) {
      return (
        currentMinutesSinceMidnight >= openingTimeInMinutes &&
        currentMinutesSinceMidnight < closingTimeInMinutes
      );
    } else {
      // Case 2: Overnight hours (e.g. 23:00 – 02:00)
      // It's considered "open" if the current time is after opening OR before closing
      return (
        currentMinutesSinceMidnight >= openingTimeInMinutes ||
        currentMinutesSinceMidnight < closingTimeInMinutes
      );
    }
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
              <div style={{ position: "relative" }}>
                {facility.isDefault && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      backgroundColor: "rgba(151, 81, 2, 0.5)", // semi-transparent brownish box
                      borderRadius: "50%",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={DefaultFacility} alt="default" />
                  </div>
                )}
                <img
                  src={facility.imageUrl}
                  alt={facility.name}
                  style={{
                    borderRadius: "4px",
                    height: "195px",
                    width: "100%",
                  }}
                />
              </div>
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
