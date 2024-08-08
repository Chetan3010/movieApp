import { GrNext, GrPrevious } from "react-icons/gr";
import axios from "../utils/axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { MdTheaterComedy } from "react-icons/md";

const Caraousel = () => {
    const [trendingData, setTredingData] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const delayRef = useRef(null);
    const touchStartXRef = useRef(0);

    const getCarouselData = async () => {
        try {
            const { data } = await axios.get(`/trending/all/week`);
            setTredingData(() =>
                data.results.filter((item) => item.backdrop_path !== null)
            );
            setCurrentIndex(0);
        } catch (error) {
            console.error(error);
        }
    };

    const getGenres = async () => {
        try {
            const movieGenres = await axios.get(`/genre/movie/list`);
            const tvGenres = await axios.get(`/genre/tv/list`);
            setGenres([...movieGenres.data.genres, ...tvGenres.data.genres]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateIndices = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingData.length);
    }, [trendingData.length]);

    useEffect(() => {
        getCarouselData();
        getGenres();
    }, []);

    useEffect(() => {
        const startInterval = () => {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(updateIndices, 500000);
        };

        startInterval();
        return () => clearInterval(intervalRef.current);
    }, [updateIndices, trendingData.length]);

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

    const getGenreNames = (genreIds) => {
        return genreIds
            .map((id) => genres.find((genre) => genre.id === id)?.name)
            .join("/");
    };

    const previousIndex =
        currentIndex === 0 ? trendingData.length - 1 : currentIndex - 1;
    const nextIndex =
        currentIndex === trendingData.length - 1 ? 0 : currentIndex + 1;

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        // *made command because getting console error because passive event call and after doing this does find any errors
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

    return (
        <div
            className="relative w-full pt-2 selection:bg-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full flex items-center justify-center ">
                <div className="flex w-full">
                    <div
                        key={previousIndex}
                        className={`relative w-[15%] flex-none px-1 sm:px-2 box-border hover:text-[#C147E9] cursor-pointer hidden md:block`}
                        onClick={handlePrevClick}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original/${trendingData[previousIndex]?.backdrop_path}`}
                            alt={`Slide ${previousIndex}`}
                            className="prev object-cover object-right w-full h-[15rem] sm:h-[28rem] rounded-md opacity-50 border-[1px] border-zinc-500"
                        />
                        <GrPrevious className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-10 font-bold text-xl sm:text-3xl" />
                    </div>
                    <div
                        key={currentIndex}
                        className={`w-full md:w-[70%] flex-none px-2 box-border relative cursor-pointer`}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original/${trendingData[currentIndex]?.backdrop_path}`}
                            alt={`Slide ${currentIndex}`}
                            className="current object-cover w-full h-[18rem] sm:h-[28rem] rounded-md opacity-70"
                        />
                        <div className="absolute left-4 bottom-2 ">
                            <h1 className="text-[1.5rem] sm:text-[2rem] font-bold">
                                {trendingData[currentIndex]?.title ||
                                    trendingData[currentIndex]?.name ||
                                    trendingData[currentIndex]
                                        ?.original_title ||
                                    trendingData[currentIndex]?.original_name}
                            </h1>
                            {trendingData[currentIndex]?.overview && (
                                <p className="text-[0.70rem] font-light sm:text-sm w-[98%] sm:w-2/3 mb-2">
                                    {trendingData[currentIndex]?.overview.slice(
                                        0,
                                        150
                                    )}
                                    ...
                                    <Link className="text-blue-400">
                                        {" "}
                                        read more
                                    </Link>
                                </p>
                            )}
                            <div className="mb-1 sm:mb-2">
                                {trendingData[currentIndex]?.release_date && (
                                    <p className="flex items-center gap-1 sm:gap-2 text-[0.80rem]">
                                        <FaCalendar className="text-yellow-500" />
                                        {trendingData[currentIndex]
                                            .release_date || "Not available"}
                                    </p>
                                )}
                                {trendingData[currentIndex]?.media_type && (
                                    <p className="flex items-center gap-1 sm:gap-2 text-[0.80rem]">
                                        <FaCircleDot className="text-yellow-500" />
                                        {trendingData[
                                            currentIndex
                                        ]?.media_type.toUpperCase()}
                                    </p>
                                )}
                                {trendingData[currentIndex]?.genre_ids && (
                                    <p className="flex items-center gap-1 sm:gap-2 text-[0.80rem]">
                                        <MdTheaterComedy className="text-yellow-500" />
                                        {getGenreNames([
                                            ...trendingData[currentIndex]
                                                .genre_ids,
                                        ])}
                                    </p>
                                )}
                            </div>
                            <button className="px-2 py-1 bg-[#c147e9] text-white text-lg font-semibold rounded-md">
                                Watch Trailer
                            </button>
                        </div>
                    </div>
                    <div
                        key={nextIndex}
                        className={`relative w-[15%] flex-none px-1 sm:px-2 box-border hover:text-[#C147E9] cursor-pointer hidden md:block`}
                        onClick={handleNextClick}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original/${trendingData[nextIndex]?.backdrop_path}`}
                            alt={`Slide ${nextIndex}`}
                            className="next object-cover object-left w-full h-[15rem] sm:h-[28rem] rounded-md opacity-50 border-[1px] border-zinc-500"
                        />
                        <GrNext className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-bold text-xl sm:text-3xl" />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-2">
                {trendingData.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1 rounded-full mx-[2px] transition-all duration-500 ease-in ${
                            currentIndex === index
                                ? "bg-purple-400 w-3"
                                : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Caraousel;
