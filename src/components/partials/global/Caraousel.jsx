import { GrNext, GrPrevious } from "react-icons/gr";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { MdTheaterComedy } from "react-icons/md";
import { getGenreNames } from "../../../utils/helper";

const Caraousel = ({ trendingData, genres }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const delayRef = useRef(null);
    const touchStartXRef = useRef(0);

    const updateIndices = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingData.length);
    }, [trendingData.length]);

    const previousIndex =
        currentIndex === 0 ? trendingData.length - 1 : currentIndex - 1;
    const nextIndex =
        currentIndex === trendingData.length - 1 ? 0 : currentIndex + 1;

   /**
    * The `handleManualChange` function sets a new index, clears any existing interval and delay, and
    * then restarts the interval after a 5-second delay.
    */
    const handleManualChange = (newIndex) => {
        setCurrentIndex(newIndex);
        clearInterval(intervalRef.current);
        clearTimeout(delayRef.current);
        delayRef.current = setTimeout(() => {
            intervalRef.current = setInterval(updateIndices, 2000);
        }, 5000); // 5 seconds delay before restarting the interval
    };

    const handlePrevClick = () => {
        handleManualChange(
            currentIndex === 0 ? trendingData.length - 1 : currentIndex - 1
        );
    };

    const handleNextClick = () => {
        handleManualChange((currentIndex + 1) % trendingData.length);
    };

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        // *made fucntion because getting console error of passive event call.
        // e.preventDefault();
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchDelta = touchStartXRef.current - touchEndX;
        console.log("TouchEnd");
        if (touchDelta > 50) {
            handleNextClick(); // Right to left swipe
        } else if (touchDelta < -50) {
            handlePrevClick(); // Left to right swipe
        }
    };

    useEffect(() => {
        const startInterval = () => {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(updateIndices, 5000);
        };

        startInterval();
        return () => clearInterval(intervalRef.current);
    }, [updateIndices, trendingData.length]);

    return (
        <div
            className="relative w-full pt-2 selection:bg-none mb-5 md:mb-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full flex items-center justify-center ">
                <div className="flex w-full justify-center gap-3 px-1">
                    {trendingData?.length > 0 ? (
                        <>
                            <div
                                key={previousIndex}
                                className={`relative w-[8%] flex-none box-border hover:text-[#C147E9] cursor-pointer hidden md:block`}
                                onClick={handlePrevClick}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${trendingData[previousIndex]?.backdrop_path}`}
                                    alt={`Slide`}
                                    className="prev object-cover object-right w-full h-[15rem] sm:h-[28rem] md:h-[30rem] rounded-md opacity-50 border-[1px] border-zinc-500"
                                />
                                <GrPrevious className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-10 font-bold text-xl sm:text-3xl" />
                            </div>
                            <Link
                                to={`/${trendingData[previousIndex].media_type}/${trendingData[currentIndex].id}-${(trendingData[currentIndex].title || trendingData[currentIndex].name).split(" ").join("_")}`}
                                key={currentIndex}
                                className={`now w-full md:w-[80%] flex-none box-border relative cursor-pointer bg-gradient-to-tr from-zinc-950 to-transparent`}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${trendingData[currentIndex]?.backdrop_path}`}
                                    alt={`Slide`}
                                    className="current object-cover w-full h-[18rem] sm:h-[28rem] md:h-[30rem] rounded-md opacity-70 border border-zinc-500"
                                />
                                <div className="absolute left-4 bottom-2 ">
                                    <h1 className="text-[1.5rem] sm:text-[2rem] font-bold">
                                        {trendingData[currentIndex]?.title ||
                                            trendingData[currentIndex]?.name ||
                                            trendingData[currentIndex]
                                                ?.original_title ||
                                            trendingData[currentIndex]
                                                ?.original_name}
                                    </h1>
                                    {trendingData[currentIndex]?.overview && (
                                        <p className="text-[0.70rem] font-light text-wrap sm:text-sm w-[98%] sm:w-2/3 mb-2 hidden md:block">
                                            {trendingData[
                                                currentIndex
                                            ]?.overview.slice(0, 150)}
                                            ...
                                            <span className="text-blue-400">
                                                {" "}
                                                read more
                                            </span>
                                        </p>
                                    )}
                                    <div className="mb-1 sm:mb-2">
                                        {trendingData[currentIndex]
                                            ?.release_date && (
                                            <p className="flex items-center gap-1 sm:gap-2 text-[0.80rem]">
                                                <FaCalendar className="text-yellow-500" />
                                                {trendingData[currentIndex]
                                                    .release_date ||
                                                    "Not available"}
                                            </p>
                                        )}
                                        {trendingData[currentIndex]
                                            ?.media_type && (
                                            <p className="flex items-center gap-1 sm:gap-2 text-[0.80rem]">
                                                <FaCircleDot className="text-yellow-500" />
                                                {trendingData[
                                                    currentIndex
                                                ]?.media_type.toUpperCase()}
                                            </p>
                                        )}
                                        {trendingData[currentIndex]
                                            ?.genre_ids && (
                                            <p className="flex items-center gap-1 sm:gap-2 text-[0.80rem]">
                                                <MdTheaterComedy className="text-yellow-500" />
                                                {getGenreNames(genres, [
                                                    ...trendingData[
                                                        currentIndex
                                                    ].genre_ids,
                                                ])}
                                            </p>
                                        )}
                                    </div>
                                    <button className="px-2 py-1 bg-[#c147e9] w-b text-white text-lg font-semibold rounded-md">
                                        Watch Trailer
                                    </button>
                                </div>
                            </Link>
                            <div
                                key={nextIndex}
                                className={`relative w-[8%] flex-none box-border hover:text-[#C147E9] cursor-pointer hidden md:block`}
                                onClick={handleNextClick}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${trendingData[nextIndex]?.backdrop_path}`}
                                    alt={`Slide`}
                                    className="next object-cover object-left w-full h-[15rem] sm:h-[28rem] md:h-[30rem] rounded-md opacity-50 border border-zinc-500"
                                />
                                <GrNext className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-bold text-xl sm:text-3xl" />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Caraousel Skeleton */}
                            <div className="relative w-[8%] h-[15rem] sm:h-[28rem] flex-none box-border bg-gray-600 cursor-pointer hidden md:block rounded-md animate-pulse"></div>
                            <div className="w-full md:w-[80%] h-[18rem] sm:h-[28rem] flex-none box-border relative cursor-pointer bg-gray-600 rounded-md animate-pulse">
                                <div className="absolute left-4 bottom-2">
                                    <h1 className="bg-gray-500 h-12 rounded w-72 mb-2 animate-pulse"></h1>
                                    {["", ""].map((_, index) => (
                                        <p
                                            key={index}
                                            className="h-4 rounded w-[98%] sm:w-2/3 mb-1 bg-gray-500 animate-pulse"
                                        ></p>
                                    ))}
                                    <div className="mb-1 sm:mb-2">
                                        {["", "", ""].map((_, index) => (
                                            <p
                                                key={index}
                                                className="flex items-center gap-1 sm:gap-2 bg-gray-500 w-32 rounded mb-1 h-4 animate-pulse"
                                            ></p>
                                        ))}
                                    </div>
                                    <div className="px-2 py-1 h-8 w-24 rounded-md bg-gray-500 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="relative w-[8%] h-[15rem] sm:h-[28rem] flex-none box-border bg-gray-600 cursor-pointer hidden md:block rounded-md animate-pulse"></div>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center mt-2 md:mt-4/*  */">
                {trendingData.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1 rounded-full mx-[2px] transition-all duration-500 ease-in ${
                            currentIndex === index
                                ? "bg-[#C147E9] w-3"
                                : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Caraousel;
