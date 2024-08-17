import React, { useState } from "react";
import Topnav from "../Layout/Topnav";
import { useFetch } from "../../hooks/useFetch";
import { apiEndpoints } from "../../utils/constants";
import Cards from "../partials/Cards";
import SelectionTab from "../partials/SelectionTab";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const NowPlaying = () => {
    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);

    const {
        data: movies,
        setData: setMovies,
        isPending: isPendingMovie,
        error: movieError,
        totalPages: movieTotalPages,
    } = useFetch(apiEndpoints.movie.nowPlaying({ page: moviePage }));
    const {
        data: tv,
        setData: setTv,
        isPending: isPendingTv,
        error: tvError,
        totalPages: tvTotalPages,
    } = useFetch(apiEndpoints.tv.airingToday({ page: tvPage }));

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
            className={`w-full min-h-screen bg-[#0F0617] text-white san-public relative`}
        >
            <Topnav />
            <div className="fixed w-10 h-10 top-10 right-10 z-50 rounded-full bg-gray-700 text-white flex justify-center items-center">{moviePage}</div>
            <div className="w-full mt-2 md:mt-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-5">
                    {selectionType === "tv"
                        ? "Airing Today's tv shows"
                        : "Now playing in theatres"}
                </h1>
                <SelectionTab
                    options={[
                        { name: "Movies", value: "movie" },
                        { name: "TV Shows", value: "tv" },
                    ]}
                    selectedOption={selectionType}
                    onSelect={(option) => setSelectionType(option)}
                />
            </div>
            <div className="px-4 md:px-14 mt-5 md:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-12">
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
