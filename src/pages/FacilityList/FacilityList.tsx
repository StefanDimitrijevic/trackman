import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Facility } from "../../types/facilities";
import { getFacilities, saveFacilities } from "../../data/facilityStore";
import FacilityCard from "../../components/FacilityCard/FacilityCard";
import Button from "../../components/Button/Button";

const FacilityList: FC = () => {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    const storedFacilities = getFacilities();
    setFacilities(storedFacilities);
  }, []);

  const handleEditFacility = (id: string) => {
    navigate(`/edit/${id}`);
  };

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

  return (
    <div>
      <Button
        variant="primary"
        padding="normal"
        onClick={() => navigate("/create")}
      >
        Create Facility
      </Button>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            onEdit={handleEditFacility}
            onDelete={handleDeleteFacility}
          />
        ))}
      </div>
    </div>
  );
};

export default FacilityList;
