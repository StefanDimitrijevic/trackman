import { NavLink, Link } from "react-router-dom";
import { useState, type FC } from "react";
import TrackmanLogo from "../../assets/trackman-logo.svg";
import styles from "./Navbar.module.css";
import classNames from "classnames";

const navLinks = [
  { to: "/", label: "Facilities", end: true },
  { to: "/locations", label: "Locations" },
  { to: "/players", label: "Players" },
  { to: "/access", label: "Access Management" },
];

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          <img src={TrackmanLogo} alt="TrackMan Logo" role="img" />
        </Link>
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <ul
          className={classNames(styles.navLinks, {
            [styles.mobileOpen]: isMobileMenuOpen,
          })}
        >
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={toggleMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
