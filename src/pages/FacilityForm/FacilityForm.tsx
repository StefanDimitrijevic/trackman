import type { FC, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Facility } from "../../types/facilities";
import { getFacilities, saveFacilities } from "../../data/facilityStore";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import Textarea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import styles from "./FacilityForm.module.css";

const FacilityForm: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const buttonText = isEditing ? "Update Facility" : "Create Facility";

  const [isFirstFacility, setIsFirstFacility] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const facilities = getFacilities();

    if (isEditing && id) {
      const facility = facilities.find((f) => f.id === id);
      if (facility) {
        setName(facility.name);
        setAddress(facility.address);
        setDescription(facility.description);
        setImageUrl(facility.imageUrl);
        setOpeningTime(facility.openingTime);
        setClosingTime(facility.closingTime);
        setIsDefault(facility.isDefault);
      }
    } else {
      // Create mode logic
      if (facilities.length === 0) {
        setIsDefault(true);
        setIsFirstFacility(true);
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newFacility: Facility = {
      id: id ?? Date.now().toString(),
      name,
      address,
      description,
      imageUrl,
      openingTime,
      closingTime,
      isDefault,
    };

    const facilities = getFacilities();

    if (isEditing && id) {
      // Remove existing facility with same ID
      let updatedFacilities = facilities.filter((f) => f.id !== id);

      // Clear previous default if this one is now default
      if (isDefault) {
        updatedFacilities = updatedFacilities.map((f) => ({
          ...f,
          isDefault: false,
        }));
      }

      saveFacilities([...updatedFacilities, newFacility]);
      console.log("Updated:", newFacility);
    } else {
      // Create mode
      const updatedFacilities = isDefault
        ? facilities.map((f) => ({ ...f, isDefault: false }))
        : facilities;

      saveFacilities([...updatedFacilities, newFacility]);
      console.log("Created:", newFacility);
    }

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles.facilityForm}>
      <div className={styles.header}>
        <h2>{isEditing ? "Edit Facility" : "Create a New Facility"}</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="name"
          label="Facility Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          id="address"
          label="Address *"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Textarea
          id="description"
          label="Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          id="imageUrl"
          label="Cover Image URL *"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Checkbox
          id="isDefault"
          label="Default Facility"
          checked={isDefault}
          disabled={isFirstFacility}
          onChange={(e) => setIsDefault(e.target.checked)}
          description="Setting this facility as default will override the currently marked default facility."
        />

        <div className={styles.hoursLabel}>
          <h4 className={styles.hoursLabel}>Working Hours</h4>

          <div className={styles.hoursContainer}>
            <Input
              id="openingTime"
              label="Opening TIme *"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
            />

            <Input
              id="closingTime"
              label="Closing Time *"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            variant="secondary"
            padding="normal"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="primary" padding="normal" type="submit">
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FacilityForm;
