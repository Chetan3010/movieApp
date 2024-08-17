import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NowPlaying from "./components/Pages/NowPlaying.jsx";
import About from "./components/Pages/About.jsx";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/now_playing",
        element: <NowPlaying />,
    },
    { path: "/about", element: <About /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={Routes}>
            <App />
        </RouterProvider>
    </React.StrictMode>
);
