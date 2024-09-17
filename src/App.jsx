import React, { useEffect, useRef } from "react";
import Index from "./components/pages/Index";
import Login from "./components/pages/account/Login";
import SearchPage from "./components/pages/SearchPage";
import NowPlaying from "./components/pages/NowPlaying";
import Explore from "./components/pages/Explore";
import WatchProviders from "./components/pages/watch-provider/WatchProviders";
import MovieProvider from "./components/pages/watch-provider/MovieProvider";
import TvProvider from "./components/pages/watch-provider/TvProvider";
import GenreMovies from "./components/pages/GenreMovies";
import GenreTv from "./components/pages/GenreTv";
import Movies from "./components/pages/movie/Movies";
import MovieInfo from "./components/pages/movie/MovieInfo";
import TvShows from "./components/pages/tv/TvShows";
import TvInfo from "./components/pages/tv/TvInfo";
import TvSeason from "./components/pages/tv/TvSeason";
import TvEpisode from "./components/pages/tv/TvEpisode";
import Network from "./components/pages/Network";
import Keyword from "./components/pages/Keyword";
import Peoples from "./components/pages/people/Peoples";
import PeopleInfo from "./components/pages/people/PeopleInfo";
import Collection from "./components/pages/Collection";
import About from "./components/pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SmoothScroll from "./components/partials/global/SmoothScroll";
import Error from "./components/pages/Error";
import { GlobalDebug } from "./utils/helper";

const App = () => {
    const Routes = createBrowserRouter([
        {
            path: "/",
            element: <Index />,
            errorElement: <Error />
        },
        {
            path: "/account/login",
            element: <Login />,
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

    return (
        <SmoothScroll>
            <RouterProvider router={Routes}></RouterProvider>
        </SmoothScroll>
    );
};

export default App;
