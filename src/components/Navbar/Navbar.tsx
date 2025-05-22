// src/components/Navbar/Navbar.tsx
import { NavLink, Link } from "react-router-dom";
import type { FC } from "react";
import TrackmanLogo from "../../assets/trackman-logo.svg";
import styles from "./Navbar.module.css";

const navLinks = [
  { to: "/", label: "Facilities", end: true },
  { to: "/locations", label: "Locations" },
  { to: "/players", label: "Players" },
  { to: "/access", label: "Access Management" },
];

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <Link to="/" className={styles.logo}>
        <img src={TrackmanLogo} alt="TrackMan Logo" role="img" />
      </Link>
      <ul className={styles.navLinks}>
        {navLinks.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
