import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

window.hideShell = function () {
  const shell = document.getElementById("shell");
  if (shell) {
    shell.classList.add("fade-out");
    setTimeout(() => shell.remove(), 200);
  }
};
