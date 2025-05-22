import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout: FC = () => (
  <>
    <Navbar />
    <main style={{ padding: "1.5rem", backgroundColor: "#FAFAFA" }}>
      <Outlet />
    </main>
  </>
);

export default MainLayout;
