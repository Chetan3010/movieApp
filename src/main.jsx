import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MovieGenreProvider, TvGenreProvider } from "./contexts/Contexts.jsx";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm("New content available. Reload?")) {
        updateSW(true);
      }
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MovieGenreProvider>
            <TvGenreProvider>
                <App />
            </TvGenreProvider>
        </MovieGenreProvider>
    </React.StrictMode>
);
