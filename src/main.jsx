import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JiraContext } from "./context/JiraContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JiraContext>
      <App />
    </JiraContext>
  </React.StrictMode>
);
