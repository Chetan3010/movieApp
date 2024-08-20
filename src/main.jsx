import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NowPlaying from "./components/Pages/NowPlaying.jsx";
import About from "./components/Pages/About.jsx";
import Explore from "./components/Pages/Explore.jsx";
import Movies from "./components/Pages/Movies.jsx";
import TvShows from "./components/Pages/TvShows.jsx";
import Peoples from "./components/Pages/Peoples.jsx";
import { MovieGenreProvider, TvGenreProvider } from "./Contexts/Contexts.jsx";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/now-playing",
        element: <NowPlaying />,
    },
    {
        path: "/explore",
        element: <Explore />,
    },
    {
        path: "/movie",
        element: <Movies />,
    },
    {
        path: "/tvshow",
        element: <TvShows />,
    },
    {
        path: "/people",
        element: <Peoples />,
    },
    {
        path: "/about",
        element: <About />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MovieGenreProvider>
            <TvGenreProvider>
                <RouterProvider router={Routes}>
                    <App />
                </RouterProvider>
            </TvGenreProvider>
        </MovieGenreProvider>
    </React.StrictMode>
);
