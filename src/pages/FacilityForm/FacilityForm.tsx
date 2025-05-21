import type { FC } from "react";
import { useParams } from "react-router-dom";

const FacilityForm: FC = () => {
  const { id } = useParams();

  const isEditing = Boolean(id);

  return <div>{isEditing ? "Edit Facility" : "Create a new facility"}</div>;
};

export default FacilityForm;
