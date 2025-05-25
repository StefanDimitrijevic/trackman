import type { FC } from "react";
import type { Facility } from "../../types/facilities";
import LocationMarker from "../../assets/location-marker.svg";
import TrashCan from "../../assets/trashcan.svg";
import DefaultFacility from "../../assets/star.svg";
import StatusBadge from "../StatusBadge/StatusBadge";
import { isFacilityOpen } from "../../utils/openingHours";
import Card from "../Card/Card";
import styles from "./FacilityCard.module.css";
import Button from "../Button/Button";

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
  const isOpen = isFacilityOpen(facility.openingTime, facility.closingTime);

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
        <p title={facility.name} className={styles.name}>
          {facility.name}
        </p>
        <StatusBadge status={isOpen ? "Open" : "Closed"} />
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.addressContainer}>
          <img src={LocationMarker} alt="location" />
          <p title={facility.address} className={styles.address}>
            {facility.address}
          </p>
        </div>

        <div className={styles.actionsContainer}>
          <Button
            variant="secondary"
            icon={<img src={TrashCan} alt="delete-facility" />}
            padding="normal"
            onClick={() => onDelete(facility.id)}
            aria-label="Delete Facility"
          />
          <Button
            variant="secondary"
            padding="tight"
            onClick={() => onEdit(facility.id)}
          >
            Edit
          </Button>
        </div>
      </div>

      <p style={{ marginTop: "4px" }}>{facility.description}</p>
    </Card>
  );
};

export default FacilityCard;
