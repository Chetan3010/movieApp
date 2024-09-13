import React, { useState } from "react";
import Topnav from "../../partials/topnav/Topnav";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints } from "../../../utils/constants";
import CardsDrawer from "../../partials/global/CardsDrawer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { ScrollRestoration } from "react-router-dom";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";

const TvShows = () => {
    const [topRatedPage, setTRPage] = useState(1);
    const [popularPage, setPPPage] = useState(1);
    const topRated = useFetch(apiEndpoints.tv.topRated({ page: topRatedPage }));
    const popular = useFetch(apiEndpoints.tv.popular({ page: popularPage }));

    const topRatedRef = useInfiniteScroll({
        isPending: topRated.isPending,
        page: topRatedPage,
        setPage: setTRPage,
        totalPages: topRated.totalPages,
    });

    const popularRef = useInfiniteScroll({
        isPending: popular.isPending,
        page: popularPage,
        setPage: setPPPage,
        totalPages: popular.totalPages,
    });

    const cardData = {
        topRated: {
            ...topRated,
            ...topRatedRef,
            title: "Top Rated TV Shows",
            route: "tv",
        },
        popular: {
            ...popular,
            ...popularRef,
            title: "Popular TV Shows",
            route: "tv",
        },
    };

    const options = [
        { name: "Top Rated", value: "topRated" },
        { name: "Popular", value: "popular" },
    ];

    return (
        <>
        <ScrollRestorationCustom />
        <section className="main">
            <Topnav />
            <CardsDrawer
                lsKey={"tvTab"}
                cardData={cardData}
                options={options}
                isInfiniteScroll={true}
            />
        </section>
    </>
    );
};

export default TvShows;
