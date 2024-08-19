import React, { useContext, useEffect, useState } from "react";
import Topnav from "./components/Layout/Topnav";
import Caraousel from "./components/Layout/Caraousel";
import SelectionTab from "./components/partials/SelectionTab";
import Cards from "./components/partials/Cards";
import { apiEndpoints } from "./utils/constants";
import { MovieGenreContext, TvGenreContext } from "./Contexts/Contexts";
import useFetch from "./hooks/useFetch";
import useRegion from "./hooks/useRegion";

const App = () => {
    const { region } = useRegion();
    const {
        data: trendingData,
        setData: setTredingData,
        isPending: trendingIsPending,
        error: trendingError,
    } = useFetch(
        apiEndpoints.trending.TrendingAll({ type: "all", time_window: "week" })
    );

    const {
        data: popularMovieCards,
        setData: setPopularMovieCards,
        isPending: popularMovieIsPending,
        error: popularMovieError,
    } = useFetch(apiEndpoints.movie.popularMovie({ region }));

    const {
        data: popularTVCards,
        setData: setPopularTVCards,
        isPending: popularTvIsPending,
        error: popularTvError,
    } = useFetch(apiEndpoints.tv.popularTv({}));

    const { data: movieGenres } = useContext(MovieGenreContext);
    const { data: tvGenres } = useContext(TvGenreContext);

    const [genres, setGenres] = useState([...movieGenres, ...tvGenres]);
    const [popularType, setPopularType] = useState("movie");

    useEffect(() => {
        setGenres([...movieGenres, ...tvGenres]);
    }, [movieGenres, tvGenres]);

    return (
        <div className={`main`}>
            <Topnav />
            <Caraousel
                trendingData={trendingData}
                setTredingData={setTredingData}
                genres={genres}
                setGenres={setGenres}
            />
            <div className="w-full mt-5 md:mt-10 flex flex-col items-center justify-center">
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
            </div>
        </div>
    );
};

export default App;
