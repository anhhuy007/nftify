import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ScrollToTop from "./utils/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
