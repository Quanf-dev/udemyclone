import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.less";
import AppRoutes from "./routes";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
    <AppRoutes />
    </UserProvider>
  </StrictMode>
);
