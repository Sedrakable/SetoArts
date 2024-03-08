import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./css/index.scss";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
