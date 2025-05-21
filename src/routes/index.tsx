import { Routes, Route, Navigate } from "react-router-dom";
import FacilityList from "../pages/FacilityList/FacilityList";
import FacilityForm from "../pages/FacilityForm/FacilityForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FacilityList />} />
      <Route path="/create" element={<FacilityForm />} />
      <Route path="/edit/:id" element={<FacilityForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
