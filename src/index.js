import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { HashRouter } from "react-router-dom";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </HashRouter>
);