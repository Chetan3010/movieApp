import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints } from "../../../utils/constants";
import Topnav from "../../partials/topnav/Topnav";
import InfoPoster from "../../partials/infoPages/InfoPoster";
import { formatDate, getRating } from "../../../utils/helper";
import useRegion from "../../../hooks/useRegion";
import Facts from "../../partials/infoPages/Facts";
import TvInfoTab from "../../partials/infoPages/tv/TvInfoTab";
import Recommendations from "../../partials/infoPages/Recommendations";
import Loader from "../../partials/global/Loader";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";
import { FaPlay } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Error from "../Error";

const TvInfo = () => {
    const para = useParams();
    const id = para.id.split("-")[0];

    const [reviewPage, setReviewPage] = useState(1);
    const [rcmdPage, setRcmdPage] = useState(1);

    const { data: info, isPending, error } = useFetch(apiEndpoints.tv.details({ id }));

    const {
        data: reviews,
        isPending: reviewsLoading,
        totalPages: reviewsTotalPages,
        error: reviewError,
    } = useFetch(apiEndpoints.tv.reviews({ id, page: reviewPage }));

    const {
        data: recommendations,
        isPending: rcmdLoading,
        totalPages: rcmdTotalPages,
        error: rcmdError,
    } = useFetch(apiEndpoints.tv.recommendations({ id, page: rcmdPage }));

    const {
        backdrop_path,
        created_by, // array of objects
        first_air_date,
        genres,
        homepage,
        next_episode_to_air, // Add this
        name,
        networks,
        number_of_episodes,
        number_of_seasons,
        original_language,
        original_name,
        overview,
        poster_path,
        seasons, // array of objects
        spoken_languages,
        status,
        tagline,
        type,
        vote_average,
        images,
        videos,
        credits,
        external_ids,
        content_ratings,
    } = info;

    const { region } = useRegion();

    const rating = getRating(vote_average);

    const content_rating =
        content_ratings?.results?.filter(
            (item) => item.iso_3166_1 === region
        )[0]?.rating ?? "NR";

    const trailer = videos?.results?.find(
        (item) => item?.site === "YouTube" && item?.type === "Trailer"
    );

    const facts = [
        {
            title: "Status",
            value: status ?? "-",
            link: null,
        },
        {
            title: "Language",
            value:
                (spoken_languages && spoken_languages[0]?.english_name) || "-",
            link: null,
        },
        {
            title: "Network",
            value: (networks && networks[0]?.name) || "-",
            link:
                networks && networks[0]
                    ? `/network/${networks[0]?.id}-${networks[0]?.name
                          .split(" ")
                          .join("_")}`
                    : null,
        },
        {
            title: "Type",
            value: type ?? "-",
            link: null,
        },
    ];

    if(error){
        return <Error status={error.status} />
    }

    return (
        <>
            <ScrollRestorationCustom />
            <Toaster position="bottom-center" />
            <section className="main">
                <Topnav />
                <AnimatePresence mode="wait">
                    {!isPending ? (
                        <motion.div
                            key={"tvInfo"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full relative bg-[#0F0617] py-5"
                        >
                            {/* <MovieBg imageUrl={`https://image.tmdb.org/t/p/original/${backdrop_path}`} /> */}
                            <div className="grid md:grid-flow-col gap-6 md:gap-14 place-items-center md:place-items-start md:justify-start px-4 md:px-14">
                                <InfoPoster
                                    info={info}
                                    poster_path={poster_path}
                                    external_ids={external_ids}
                                    homepage={homepage}
                                    trailer={trailer}
                                />

                                <div className="w-full right">
                                    {/* Title */}
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold md:font-bold">
                                        {name || original_name}{" "}
                                        {first_air_date &&
                                            `(${formatDate({
                                                date: first_air_date,
                                                year: true,
                                            })})`}
                                    </h1>

                                    {/* date, genres, runtime */}
                                    <div className="mt-4 info flex flex-col justify-start md:flex-row md:items-center flex-wrap gap-1 md:gap-3 text-lg md:text-xl md:font-medium">
                                        {/* Content rating */}
                                        {content_rating ? (
                                            <h3 className="flex items-center gap-2">
                                                <i className="w-2 h-2 bg-[#c147e9] rounded-full md:hidden"></i>
                                                <span className="bg-gray-500 px-2 text-base rounded text-white">
                                                    {content_rating}
                                                </span>
                                            </h3>
                                        ) : (
                                            <></>
                                        )}

                                        {/* Genres */}
                                        {genres?.length > 0 ? (
                                            <>
                                                <div className="flex gap-2 items-center">
                                                    <i className="w-2 h-2 bg-[#c147e9] rounded-full"></i>
                                                    {genres.map(
                                                        (item, index) => (
                                                            <Link
                                                                to={`/genre/tv/${
                                                                    item.id
                                                                }-${item?.name
                                                                    .split(" ")
                                                                    .join(
                                                                        "_"
                                                                    )}`}
                                                                key={index}
                                                                className="md:border-2 border-neutral-400 underline underline-offset-2 whitespace-nowrap md:no-underline text-sm md:text-base lg:text-lg font-extralight md:font-medium rounded-full md:px-3 md:py-1 md:hover:bg-[#c147e9] md:hover:text-[#0f0617] md:hover:border-[#0f0617] transition-all ease-in duration-300 cursor-pointer"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}

                                        {/* Seasons */}
                                        {number_of_seasons ? (
                                            <h3 className="flex items-center gap-2 text-base font-light md:text-lg">
                                                <i className="w-2 h-2 bg-[#c147e9] rounded-full whitespace-nowrap"></i>
                                                {number_of_seasons} Seasons
                                            </h3>
                                        ) : (
                                            <></>
                                        )}

                                        {/* Episodes */}
                                        {number_of_episodes ? (
                                            <h3 className="flex items-center gap-2 text-base font-light md:text-lg">
                                                <i className="w-2 h-2 bg-[#c147e9] rounded-full whitespace-nowrap"></i>
                                                {number_of_episodes} Episodes
                                            </h3>
                                        ) : (
                                            <></>
                                        )}
                                    </div>

                                    {/* Next Episode */}
                                    {next_episode_to_air && (
                                        <Link
                                            to={`season/${next_episode_to_air.season_number}/episode/${next_episode_to_air.episode_number}`}
                                            className="flex items-center gap-1 text-lg my-2"
                                        >
                                            <FaPlay className="text-[#c147e9]" />
                                            Next episode coming on{" "}
                                            <span className="text-[#c147e9] underline decoration-dashed underline-offset-2 ">
                                                {formatDate({
                                                    date: next_episode_to_air.air_date,
                                                    year: true,
                                                    day: true,
                                                    month: true,
                                                })}
                                            </span>
                                        </Link>
                                    )}

                                    {/* tagline */}
                                    {tagline && (
                                        <h3 className="tagline italic text-xl text-neutral-300 font-light mt-2">
                                            {tagline}
                                        </h3>
                                    )}

                                    {/* overview */}
                                    <p className="overview py-2 text-lg text-neutral-400">
                                        {overview}
                                    </p>

                                    {/* rating */}
                                    {vote_average ? (
                                        <div className="rating flex py-2 items-end">
                                            <h1 className="text-7xl font-bold text-[#c147e9] leading-none">
                                                {rating}
                                            </h1>
                                            <h3 className="text-xl leading-9">
                                                / 10
                                            </h3>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {/* crew data */}
                                    {created_by?.length > 0 ? (
                                        <div className="crew py-5 grid grid-cols-2 sm:grid-3 md:grid-cols-4 lg:grid-cols-5 gap-5 text-lg md:text-xl">
                                            {created_by?.map((item, index) => (
                                                <Link
                                                    to={`/person/${
                                                        item.id
                                                    }-${item.name
                                                        .split(" ")
                                                        .join("_")}`}
                                                    key={index}
                                                >
                                                    <h3 className="">
                                                        Creator
                                                    </h3>
                                                    <motion.h3
                                                        whileHover={{
                                                            color: "#c147e9",
                                                        }}
                                                        className="font-semibold tracking-wide md:font-bold underline cursor-pointer"
                                                    >
                                                        {item.name ||
                                                            item.original_name}
                                                    </motion.h3>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            {/* Facts */}
                            <div className="facts w-full flex items-center justify-center mt-10 md:mt-20 ">
                                <Facts facts={facts} />
                            </div>

                            {/* Selection Tab */}
                            <div className="selectiontab my-5 mt-10">
                                <div className="w-full flex flex-col items-center">
                                    <TvInfoTab
                                        cast={credits?.cast}
                                        seasons={seasons}
                                        backdrops={images?.backdrops}
                                        posters={images?.posters}
                                        reviewsData={{
                                            reviews,
                                            reviewPage,
                                            setReviewPage,
                                            reviewError,
                                            reviewsLoading,
                                            reviewsTotalPages,
                                        }}
                                        title={name || original_name}
                                    />
                                </div>
                            </div>

                            {recommendations?.length > 0 && (
                                <Recommendations
                                    data={{
                                        route: "tv",
                                        recommendations,
                                        rcmdLoading,
                                        rcmdError,
                                        rcmdTotalPages,
                                        rcmdPage,
                                        setRcmdPage,
                                    }}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={"loader"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-[80vh] flex justify-center items-center"
                        >
                            <Loader classname={"w-16 h-16"} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};

export default TvInfo;
