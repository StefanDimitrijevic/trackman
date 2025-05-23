import type { FC } from "react";
import styles from "./StatusBadge.module.css";
import type { Statuses } from "../../types/facilities";

interface StatusBadgeProps {
  status: Statuses;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const isOpen = status === "Open";

  return <div className={isOpen ? styles.open : styles.closed}>{status}</div>;
};

export default StatusBadge;
