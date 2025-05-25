import type { FC, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const TextArea: FC<TextAreaProps> = ({ label, id, ...rest }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea id={id} className={styles.textarea} {...rest} />
    </div>
  );
};

export default TextArea;
