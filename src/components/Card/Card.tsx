import { type FC, type ReactNode } from "react";
import styles from "./Card.module.css";

const Card: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

export default Card;
