import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import Topnav from "../partials/topnav/Topnav";
import Caraousel from "../partials/global/Caraousel";
import CardsDrawer from "../partials/global/CardsDrawer";
import { MovieGenreContext, TvGenreContext } from "../../contexts/Contexts";
import { apiEndpoints } from "../../utils/constants";
import useFetch from "../../hooks/useFetch";

const Index = () => {
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
        <>
            <Toaster position="bottom-center" />
            <ScrollRestorationCustom />
            <div className={`main`}>
                <Topnav />
                <Caraousel
                    trendingData={[...trendingData.filter(item => item.media_type === 'movie' || item.media_type === 'tv')]}
                    genres={[...movieGenres, ...tvGenres]}
                />
                <CardsDrawer
                    options={options}
                    cardData={cardData}
                    lsKey={"indexTab"}
                />
            </div>
        </>
    );
};

export default Index;
