import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Facility } from "../../types/facilities";
import { getFacilities, saveFacilities } from "../../data/facilityStore";
import FacilityCard from "../../components/FacilityCard/FacilityCard";
import Button from "../../components/Button/Button";
import styles from "./FacilityList.module.css";
import Modal from "../../components/Modal/Modal";

const FacilityList: FC = () => {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  useEffect(() => {
    const storedFacilities = getFacilities();
    setFacilities(storedFacilities);
  }, []);

  const handleEditFacility = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const promptDelete = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowDeleteModal(true);
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

  const handleConfirmDelete = () => {
    if (selectedFacility) {
      handleDeleteFacility(selectedFacility.id);
      setShowDeleteModal(false);
      setSelectedFacility(null);
    }
  };

  return (
    <div className={styles.facilityList}>
      <div className={styles.buttonRow}>
        <Button
          variant="primary"
          padding="normal"
          onClick={() => navigate("/create")}
        >
          Create Facility
        </Button>
      </div>
      {facilities.length === 0 ? (
        <p>
          Click the <strong>Create Facility</strong> button to start adding
          facilities!
        </p>
      ) : (
        <div className={styles.facilityGrid}>
          {[...facilities]
            .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
            .map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                onEdit={handleEditFacility}
                onDelete={() => promptDelete(facility)}
              />
            ))}
        </div>
      )}

      <Modal
        isOpen={showDeleteModal}
        title="Delete Facility"
        description={
          <>
            Are you sure you want to delete this facility? This action cannot be
            undone.
            <br />
            Facility: <strong>{selectedFacility?.name}</strong>
          </>
        }
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default FacilityList;
