import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

type ButtonVariant = "primary" | "secondary";
type ButtonPadding = "tight" | "normal";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children?: ReactNode;
  padding?: ButtonPadding;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  icon,
  children,
  padding,
  className,
  ...props
}) => {
  const isIconOnly = !!icon && !children;

  const btnClass = classNames(
    styles.button,
    styles[variant],
    {
      [styles.iconOnly]: isIconOnly,
      [styles.withText]: !isIconOnly,
      [styles.tightPadding]: padding === "tight",
      [styles.normalPadding]: padding === "normal" || !padding,
    },
    className
  );

  return (
    <button className={btnClass} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
