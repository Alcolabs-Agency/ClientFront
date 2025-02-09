import React from "react";
import ReactDOM from "react-dom/client"; // Cambiar de "react-dom" a "react-dom/client"
import App from "./App";
import "./assets/styles/fonts.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
