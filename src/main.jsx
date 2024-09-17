import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MovieGenreProvider, TvGenreProvider } from "./contexts/Contexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MovieGenreProvider>
            <TvGenreProvider>
                <App />
            </TvGenreProvider>
        </MovieGenreProvider>
    </React.StrictMode>
);
