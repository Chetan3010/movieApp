import React, { useContext } from "react";
import Topnav from "./components/layout/Topnav";
import Caraousel from "./components/layout/Caraousel";
import { apiEndpoints } from "./utils/constants";
import { MovieGenreContext, TvGenreContext } from "./Contexts/Contexts";
import useFetch from "./hooks/useFetch";
import useRegion from "./hooks/useRegion";
import CardsDrawer from "./components/layout/CardsDrawer";
import { ScrollRestoration } from "react-router-dom";

const App = () => {
    const { data: trendingData, setData: setTredingData } = useFetch(
        apiEndpoints.trending.trending({ type: "all", time_window: "day" })
    );

    const movies = useFetch(
        apiEndpoints.trending.trending({ type: "movie", time_window: "week" })
    );
    const tv = useFetch(
        apiEndpoints.trending.trending({ type: "tv", time_window: "week" })
    );

    const { data: movieGenres } = useContext(MovieGenreContext);
    const { data: tvGenres } = useContext(TvGenreContext);

    const options = [
        { name: "Movies", value: "movie" },
        { name: "Tv Shows", value: "tv" },
    ];

    const cardData = {
        movie: {
            ...movies,
            title: "Trending now",
            route: 'movie'
        },
        tv: {
            ...tv,
            title: "Trending now",
            route: 'tv'
        },
    };

    return (
        <div className={`main`}>
            <ScrollRestoration />
            <Topnav />
            <Caraousel
                trendingData={trendingData}
                setTredingData={setTredingData}
                genres={[...movieGenres, ...tvGenres]}
            />
            <CardsDrawer
                options={options}
                cardData={cardData}
                lsKey={"indexTab"}
            />
            {/* <div className="w-full mt-5 md:mt-10 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-5">
                    What's Popular
                </h1>
                <SelectionTab
                    lsKey="homeTab"
                    options={[
                        { name: "Movies", value: "movie" },
                        { name: "TV Shows", value: "tv" },
                    ]}
                    selectedOption={popularType}
                    onSelect={(option) => setPopularType(option)}
                />
            </div>
            <div className="cardDrawer">
                <Cards
                    items={
                        popularType === "tv"
                            ? popularTVCards
                            : popularMovieCards
                    }
                    isPending={
                        popularType === "tv"
                            ? popularTvIsPending
                            : popularMovieIsPending
                    }
                />
            </div> */}
        </div>
    );
};

export default App;
