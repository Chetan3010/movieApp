import React, { useContext } from "react";
import Topnav from "./components/partials/topnav/Topnav";
import Caraousel from "./components/partials/global/Caraousel";
import { apiEndpoints } from "./utils/constants";
import { MovieGenreContext, TvGenreContext } from "./contexts/Contexts";
import useFetch from "./hooks/useFetch";
import CardsDrawer from "./components/partials/global/CardsDrawer";

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
            route: "movie",
        },
        tv: {
            ...tv,
            title: "Trending now",
            route: "tv",
        },
    };

    return (
        <div className={`main`}>
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
        </div>
    );
};

export default App;
