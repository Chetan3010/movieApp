import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import NowPlaying from "./components/pages/NowPlaying.jsx";
import Explore from "./components/pages/Explore.jsx";
import WatchProviders from "./components/pages/watch-provider/WatchProviders.jsx";
import TvProvider from "./components/pages/watch-provider/TvProvider.jsx";
import Movies from "./components/pages/movie/Movies.jsx";
import MovieInfo from "./components/pages/movie/MovieInfo.jsx";
import TvShows from "./components/pages/tv/TvShows.jsx";
import TvInfo from "./components/pages/tv/TvInfo.jsx";
import TvSeason from "./components/pages/tv/TvSeason.jsx";
import TvEpisode from "./components/pages/tv/TvEpisode.jsx";
import Peoples from "./components/pages/people/Peoples.jsx";
import About from "./components/pages/About.jsx";
import { MovieGenreProvider, TvGenreProvider } from "./contexts/Contexts.jsx";
import MovieProvider from "./components/pages/watch-provider/MovieProvider.jsx";
import GenreMovies from "./components/pages/GenreMovies.jsx";
import GenreTv from "./components/pages/GenreTv.jsx";
import ScrollRestorationCustom from "./components/partials/global/ScrollRestorationCustom.jsx";
import Collection from "./components/pages/Collection.jsx";
import SearchPage from "./components/pages/SearchPage.jsx";
import PeopleInfo from "./components/pages/people/PeopleInfo.jsx";
import Network from "./components/pages/Network.jsx";
import Keyword from "./components/pages/Keyword.jsx";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/search/:query",
        element: <SearchPage />,
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
        path: "/watch-providers",
        element: <WatchProviders />,
    },
    {
        path: "/watch-providers/:pid/movie",
        element: <MovieProvider />,
    },
    {
        path: "/watch-providers/:pid/tv",
        element: <TvProvider />,
    },
    {
        path: "/genre/movies/:gid",
        element: <GenreMovies />,
    },
    {
        path: "/genre/tv/:gid",
        element: <GenreTv />,
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
        path: "/tv/:id/season/:sid",
        element: <TvSeason />,
    },
    {
        path: "/tv/:id/season/:sid/episode/:eid",
        element: <TvEpisode />,
    },
    {
        path: "/network/:id",
        element: <Network />,
    },
    {
        path: "/keyword/:id",
        element: <Keyword />,
    },
    {
        path: "/person",
        element: <Peoples />,
    },
    {
        path: "/person/:id",
        element: <PeopleInfo />,
    },
    {
        path: "/collection/:id",
        element: <Collection />,
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
