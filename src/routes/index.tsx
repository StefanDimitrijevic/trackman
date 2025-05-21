import { Routes, Route, Navigate } from "react-router-dom";
import FacilityList from "../pages/FacilityList/FacilityList";
import FacilityForm from "../pages/FacilityForm/FacilityForm";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<FacilityList />} />
        <Route path="/create" element={<FacilityForm />} />
        <Route path="/edit/:id" element={<FacilityForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
