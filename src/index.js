import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { HashRouter } from "react-router-dom";
import "highlight.js/styles/github-dark.css";

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