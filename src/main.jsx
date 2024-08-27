import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import NowPlaying from "./components/pages/NowPlaying.jsx";
import About from "./components/pages/About.jsx";
import Explore from "./components/pages/Explore.jsx";
import { MovieGenreProvider, TvGenreProvider } from "./Contexts/Contexts.jsx";
import TvShows from "./components/pages/tv/TvShows.jsx";
import Peoples from "./components/pages/people/Peoples.jsx";
import MovieInfo from "./components/pages/movie/MovieInfo.jsx";
import Movies from "./components/pages/movie/Movies.jsx";
import { ScrollToTop } from "./utils/helper.jsx";

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
        path: "/movie/:id",
        element: <MovieInfo />,
    },
    {
        path: "/tv",
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
