import React, { useState } from "react";
import Topnav from "../Layout/Topnav";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints } from "../../utils/constants";
import Cards from "../partials/Cards";
import SelectionTab from "../partials/SelectionTab";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useRegion from "../../hooks/useRegion";

const NowPlaying = () => {
    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const {region, timezone} = useRegion()

    const {
        data: movies,
        setData: setMovies,
        isPending: isPendingMovie,
        error: movieError,
        totalPages: movieTotalPages,
    } = useFetch(apiEndpoints.movie.nowPlaying({ page: moviePage, region }));

    const {
        data: tv,
        setData: setTv,
        isPending: isPendingTv,
        error: tvError,
        totalPages: tvTotalPages,
    } = useFetch(apiEndpoints.tv.airingToday({ page: tvPage, timezone }));

    const [selectionType, setSelectionType] = useState("movie");

    const { lastItemRef: movieLastItemRef, isDone: movieIsDone } =
        useInfiniteScroll({
            isPending: isPendingMovie,
            setPage: setMoviePage,
            totalPages: movieTotalPages,
            page: moviePage,
        });

    const { lastItemRef: tvLastItemRef, isDone: tvIsDone } = useInfiniteScroll({
        isPending: isPendingTv,
        setPage: setTvPage,
        totalPages: tvTotalPages,
        page: tvPage,
    });

    return (
        <div
            className={`main`}
        >
            <Topnav />
            <div className="w-full mt-2 md:mt-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-5">
                    {selectionType === "tv"
                        ? "Airing Today's tv shows"
                        : "Now playing in theatres"}
                </h1>
                <SelectionTab
                    lsKey={"npTab"}
                    options={[
                        { name: "Movies", value: "movie" },
                        { name: "TV Shows", value: "tv" },
                    ]}
                    selectedOption={selectionType}
                    onSelect={(option) => setSelectionType(option)}
                />
            </div>
            <div className="cardDrawer">
                {selectionType === "tv" ? (
                    <Cards
                        items={tv}
                        isPending={isPendingTv}
                        isInfiniteScroll={true}
                        lastItemRef={tvLastItemRef}
                        isDone={tvIsDone}
                        error={tvError}
                    />
                ) : (
                    <Cards
                        items={movies}
                        isPending={isPendingMovie}
                        isInfiniteScroll={true}
                        lastItemRef={movieLastItemRef}
                        isDone={movieIsDone}
                        error={movieError}
                    />
                )}
            </div>
        </div>
    );
};

export default NowPlaying;
