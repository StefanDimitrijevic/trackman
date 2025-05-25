import { useEffect, type FC, type ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import CloseIcon from "../../assets/close.svg";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  // Prevent scrolling when modal is visible
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.titleWrapper}>
          <p>{title}</p>
          <Button
            variant="secondary"
            icon={<img src={CloseIcon} alt="close" />}
            padding="normal"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        {description && <div className={styles.section}>{description}</div>}

        <div className={styles.actions}>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
