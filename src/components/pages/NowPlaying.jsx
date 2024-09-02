import React, { useState } from "react";
import Topnav from "../../components/partials/topnav/Topnav";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints } from "../../utils/constants";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useRegion from "../../hooks/useRegion";
import CardsDrawer from "../partials/global/CardsDrawer";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";

const NowPlaying = () => {
    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const { region, timezone } = useRegion();

    const movie = useFetch(
        apiEndpoints.movie.nowPlaying({ page: moviePage, region })
    );
    const tv = useFetch(
        apiEndpoints.tv.airingToday({ page: tvPage, timezone })
    );

    const movieRef = useInfiniteScroll({
        isPending: movie.isPending,
        page: moviePage,
        setPage: setMoviePage,
        totalPages: movie.totalPages,
    });

    const tvRef = useInfiniteScroll({
        isPending: tv.isPending,
        page: tvPage,
        setPage: setTvPage,
        totalPages: tv.totalPages,
    });

    const options = [
        { name: "Movies", value: "movie" },
        { name: "Tv Shows", value: "tv" },
    ];

    const cardData = {
        movie: {
            ...movie,
            ...movieRef,
            title: "Now playing in theaters",
            route: "movie",
        },
        tv: {
            ...tv,
            ...tvRef,
            title: "Airing Today's Tv shows",
            route: "tv",
        },
    };

    return (
        <>
            <ScrollRestorationCustom />
            <section className={`main`}>
                <Topnav />
                <CardsDrawer
                    options={options}
                    cardData={cardData}
                    lsKey={"npTab"}
                    isInfiniteScroll={true}
                />
            </section>
        </>
    );
};

export default NowPlaying;
