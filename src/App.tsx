import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import type { FC } from "react";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
