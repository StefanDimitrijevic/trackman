import type { FC, InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, description, ...rest }) => {
  return (
    <div className={styles.container}>
      <input type="checkbox" className={styles.checkbox} {...rest} />
      <div className={styles.labelContainer}>
        <label htmlFor={rest.id} className={styles.label}>
          {label}
        </label>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
