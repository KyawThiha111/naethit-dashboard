import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FrameProvider from "./provider/FrameProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FrameProvider>
      <App />
    </FrameProvider>
  </StrictMode>
);
