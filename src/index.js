import React from "react";
import { HashRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider

root.render(
  <HashRouter>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </HashRouter>
);
