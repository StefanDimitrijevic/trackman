import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout: FC = () => (
  <>
    <Navbar />
    <main style={{ padding: "1rem" }}>
      <Outlet />
    </main>
  </>
);

export default MainLayout;
