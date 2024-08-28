import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/pages/About.jsx";
import Explore from "./components/pages/Explore.jsx";
import { MovieGenreProvider, TvGenreProvider } from "./Contexts/Contexts.jsx";
import TvShows from "./components/pages/tv/TvShows.jsx";
import Peoples from "./components/pages/people/Peoples.jsx";
import Movies from "./components/pages/movie/Movies.jsx";
import MovieInfo from "./components/pages/movie/MovieInfo.jsx";
import TvInfo from "./components/pages/tv/TvInfo.jsx";
import TvSeason from "./components/pages/tv/TvSeason.jsx";
import TvEpisode from "./components/pages/tv/TvEpisode.jsx";
import NowPlaying from "./components/pages/NowPlaying.jsx";

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
        path: "/tv/:id",
        element: <TvInfo />,
    },
    {
        path: '/tv/:id/season/:sid',
        element: <TvSeason />
    },
    {
        path: '/tv/:id/season/:sid/episode/:eid',
        element: <TvEpisode />
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
