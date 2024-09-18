import React, { useState } from "react";
import Topnav from "../../partials/topnav/Topnav";
import useFetch from "../../../hooks/useFetch";
import useRegion from "../../../hooks/useRegion";
import { apiEndpoints } from "../../../utils/constants";
import CardsDrawer from "../../partials/global/CardsDrawer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";

const Movies = () => {
    const region = useRegion();
    const [topRatedPage, setTRPage] = useState(1);
    const [popularPage, setPPPage] = useState(1);
    // toprated, popular
    const topRated = useFetch(
        apiEndpoints.movie.topRated({ region, page: topRatedPage })
    );
    const popular = useFetch(
        apiEndpoints.movie.popular({ region, page: popularPage })
    );

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
            title: "Top Rated Movies",
            route: "movie",
        },
        popular: {
            ...popular,
            ...popularRef,
            title: "Popular Movies",
            route: "movie",
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
                    lsKey={"moviesTab"}
                    cardData={cardData}
                    options={options}
                    isInfiniteScroll={true}
                />
            </section>
        </>
    );
};

export default Movies;
