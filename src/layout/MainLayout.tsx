import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "./MainLayout.module.css";

const MainLayout: FC = () => (
  <>
    <Navbar />
    <main className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Outlet />
      </div>
    </main>
  </>
);

export default MainLayout;
