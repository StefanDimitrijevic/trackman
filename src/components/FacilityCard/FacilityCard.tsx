import type { FC } from "react";
import type { Facility } from "../../types/facilities";
import LocationMarker from "../../assets/location-marker.svg";
import TrashCan from "../../assets/trashcan.svg";
import DefaultFacility from "../../assets/star.svg";
import StatusBadge from "../StatusBadge/StatusBadge";
import { isFacilityOpen } from "../../utils/openingHours";
import Card from "../Card/Card";
import styles from "./FacilityCard.module.css";

interface FacilityCardProps {
  facility: Facility;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FacilityCard: FC<FacilityCardProps> = ({
  facility,
  onEdit,
  onDelete,
}) => {
  const isOpen = isFacilityOpen(facility.openingHour, facility.closingHour);

  return (
    <Card>
      <div className={styles.imageWrapper}>
        {facility.isDefault && (
          <div className={styles.defaultFacility}>
            <img src={DefaultFacility} alt="default" />
          </div>
        )}
        <img
          src={facility.imageUrl}
          alt={facility.name}
          className={styles.image}
        />
      </div>

      <div className={styles.topRow}>
        <p>{facility.name}</p>
        <StatusBadge status={isOpen ? "Open" : "Closed"} />
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.addressContainer}>
          <img src={LocationMarker} alt="location" />
          <p>{facility.address}</p>
        </div>

        <div className={styles.actionsContainer}>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(facility.id)}
          >
            <img src={TrashCan} alt="delete-facility" />
          </button>
          <button
            className={styles.editButton}
            onClick={() => onEdit(facility.id)}
          >
            Edit
          </button>
        </div>
      </div>

      <p style={{ marginTop: "4px" }}>{facility.description}</p>
    </Card>
  );
};

export default FacilityCard;
