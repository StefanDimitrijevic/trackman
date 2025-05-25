import type { FC, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Facility } from "../../types/facilities";
import { getFacilities, saveFacilities } from "../../data/facilityStore";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import Textarea from "../../components/TextArea/TextArea";

const FacilityForm: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [isFirstFacility, setIsFirstFacility] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
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
        setOpeningHour(facility.openingHour);
        setClosingHour(facility.closingHour);
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
      openingHour,
      closingHour,
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

  return (
    <div>
      <h2>{isEditing ? "Edit Facility" : "Create a New Facility"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Input
          id="name"
          label="Name *"
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
          label="Image URL *"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Input
          id="openingHour"
          label="Opening Hour *"
          value={openingHour}
          onChange={(e) => setOpeningHour(e.target.value)}
        />

        <Input
          id="closingHour"
          label="Closing Hour *"
          value={closingHour}
          onChange={(e) => setClosingHour(e.target.value)}
        />

        <Checkbox
          id="isDefault"
          label="Default Facility"
          checked={isDefault}
          disabled={isFirstFacility}
          onChange={(e) => setIsDefault(e.target.checked)}
          description="Setting this facility as default will override the currently marked default facility."
        />

        <button type="submit">{isEditing ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default FacilityForm;
