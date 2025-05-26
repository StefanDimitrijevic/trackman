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
  const isEditingFacility = Boolean(id);
  const buttonText = isEditingFacility ? "Update Facility" : "Create Facility";

  const [isFirstFacility, setIsFirstFacility] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);
  const [formData, setFormData] = useState<Facility>({
    id: "",
    name: "",
    address: "",
    description: "",
    imageUrl: "",
    openingTime: "",
    closingTime: "",
    isDefault: false,
  });

  useEffect(() => {
    const facilities = getFacilities();

    if (isEditingFacility && id) {
      const facility = facilities.find((f) => f.id === id);
      if (facility) {
        setFormData(facility);

        // Lock the checkbox if:
        // - there's only one facility (prevent unchecking default)
        // - or this facility is the only one marked as default
        const otherDefaults = facilities.filter(
          (f) => f.id !== id && f.isDefault
        );

        if (
          facilities.length === 1 ||
          (facility.isDefault && otherDefaults.length === 0)
        ) {
          setIsFirstFacility(true);
        }
      }
    } else {
      // Set first facility as default
      if (facilities.length === 0) {
        setFormData((prev) => ({ ...prev, isDefault: true }));
        setIsFirstFacility(true);
      }
    }
  }, [id, isEditingFacility]);

  // simple validation for image urls being valid
  useEffect(() => {
    if (!formData.imageUrl) {
      setIsImageValid(true);
      return;
    }

    const img = new Image();
    img.onload = () => setIsImageValid(true);
    img.onerror = () => setIsImageValid(false);
    img.src = formData.imageUrl;
  }, [formData.imageUrl]);

  const updateField = <K extends keyof Facility>(
    key: K, // must be one of the keys in the Facility type
    value: Facility[K] // must match the type of the field
  ) => {
    // overwrite one specific field
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const facilities = getFacilities();

    // Prepare new facility object
    const newFacility: Facility = {
      ...formData,
      id: id ?? Date.now().toString(),
    };

    // Remove the facility being edited else keep list as it is
    const filteredFacilities = isEditingFacility
      ? facilities.filter((f) => f.id !== id)
      : facilities;

    // If the new facility is marked as default, clear the default from others
    const normalizedFacilities = newFacility.isDefault
      ? filteredFacilities.map((f) => ({ ...f, isDefault: false }))
      : filteredFacilities;

    // Save updated list with the new/updated facility included
    saveFacilities([...normalizedFacilities, newFacility]);
    navigate("/");
  };

  // Navigate to list view if creation or update is cancelled
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles.facilityForm}>
      <div className={styles.header}>
        <h2>{isEditingFacility ? "Edit Facility" : "Create a New Facility"}</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="name"
          label="Facility Name *"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
        />

        <Input
          id="address"
          label="Address *"
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
          required
        />

        <Textarea
          id="description"
          label="Description *"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
        />

        <Input
          id="imageUrl"
          label="Cover Image URL *"
          value={formData.imageUrl}
          onChange={(e) => updateField("imageUrl", e.target.value)}
          required
        />

        {formData.imageUrl && !isImageValid && (
          <p className={styles.errorText}>
            This URL does not appear to be a valid image.
          </p>
        )}

        <Checkbox
          id="isDefault"
          label="Default Facility"
          checked={formData.isDefault}
          disabled={isFirstFacility}
          onChange={(e) => updateField("isDefault", e.target.checked)}
          description="Setting this facility as default will override the currently marked default facility."
        />

        <div className={styles.hoursLabel}>
          <h4 className={styles.hoursLabel}>Working Hours</h4>

          <div className={styles.hoursContainer}>
            <Input
              id="openingTime"
              type="time"
              label="Opening Time *"
              value={formData.openingTime}
              onChange={(e) => updateField("openingTime", e.target.value)}
              required
            />

            <Input
              id="closingTime"
              type="time"
              label="Closing Time *"
              value={formData.closingTime}
              onChange={(e) => updateField("closingTime", e.target.value)}
              required
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
          <Button
            variant="primary"
            padding="normal"
            type="submit"
            disabled={!isImageValid}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FacilityForm;
