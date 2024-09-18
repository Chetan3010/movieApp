import React, { useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import Topnav from "../../partials/topnav/Topnav";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../../utils/constants";
import BreadcrumpLinks from "../../partials/global/BreadcrumpLinks";
import { formatDate, formatRuntime, getRating } from "../../../utils/helper";
import Share from "../../partials/global/Share";
import Download from "../../partials/global/Download";
import Posters from "../../partials/infoPages/Posters";
import Cast from "../../partials/infoPages/Cast";
import Loader from "../../partials/global/Loader";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";
import EpisodeCard from "../../partials/infoPages/tv/EpisodeCard";
import { AnimatePresence, motion } from "framer-motion";
import Error from "../Error";

const TvSeason = () => {
    const para = useParams();
    const id = para.id.split("-")[0];
    const sid = para.sid;
    const tvName = para.id.split("-")[1].split("_").join(" ");

    const { data: seasonDetails, isPending, error } = useFetch(
        apiEndpoints.tv.season({ id, sid })
    );

    const { data: cast } = useFetch(
        apiEndpoints.tv.aggregateCredits({ id, sid })
    );

    const {
        air_date,
        episodes, // array of objects
        name,
        overview,
        poster_path,
        season_number,
        vote_average,
        images,
    } = seasonDetails;

    const totalRuntime = formatRuntime(
        episodes?.reduce((result, item) => result + item.runtime, 0)
    );

    const links = [
        {
            label: "Home",
            link: "/",
        },
        {
            label: tvName,
            link: `/tv/${para.id}`,
        },
        {
            label: `Season ${sid}`,
            link: null,
        },
    ];

    const rating = getRating(vote_average);

    if(error){
        return <Error status={error.status} />
    }

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <AnimatePresence mode="wait">
                    {!isPending ? (
                        <motion.div
                            key={"tvSeason"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <div className="px-5 md:px-14 mt-2">
                                <BreadcrumpLinks links={links} />
                                <div className="my-4 md:my-8 grid md:grid-flow-col gap-6 sm:gap-14 place-items-center sm:place-items-start sm:justify-start">
                                    <div className="w-72 rounded-xl overflow-hidden">
                                        <img
                                            className="bg-zinc-600"
                                            src={
                                                poster_path
                                                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                                    : defaultConst.imgPlaceholder
                                            }
                                            width={500}
                                            height={750}
                                        />
                                    </div>
                                    <div className="w-full mt-2">
                                        {/* Season number */}
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold md:font-bold whitespace-wrap flex items-center gap-2">
                                            {name
                                                ? name
                                                : `Season ${
                                                      season_number ?? ""
                                                  }`}
                                            {air_date
                                                ? `(${formatDate({
                                                      date: air_date,
                                                      year: true,
                                                  })})`
                                                : ""}
                                            <Share />
                                        </h1>

                                        {/* date, rating, runtime */}
                                        <div className="my-2 md:my-4 info flex flex-col justify-start md:flex-row md:items-center flex-wrap gap-2 md:gap-3 text-lg md:text-xl md:font-medium">
                                            {/* air_date */}
                                            <h3 className="flex md:block items-center gap-2">
                                                <i className="w-2 h-2 bg-[#c147e9] rounded-full md:hidden"></i>
                                                {air_date
                                                    ? formatDate({
                                                          date: air_date,
                                                          year: true,
                                                          month: true,
                                                          day: true,
                                                      })
                                                    : "TBA"}
                                            </h3>

                                            {/* Rating */}
                                            {rating ? (
                                                <h3 className="flex items-center gap-2 text-base md:text-lg">
                                                    <i className="w-2 h-2 bg-[#c147e9] rounded-full whitespace-nowrap"></i>
                                                    <span className="bg-gray-500 px-2 text-base rounded-full text-white">
                                                        {rating}
                                                    </span>
                                                </h3>
                                            ) : (
                                                <></>
                                            )}

                                            {/* Runtime */}
                                            {totalRuntime ? (
                                                <h3 className="flex items-center gap-2">
                                                    <i className="w-2 h-2 bg-[#c147e9] rounded-full whitespace-nowrap"></i>
                                                    {totalRuntime}
                                                </h3>
                                            ) : (
                                                <></>
                                            )}
                                        </div>

                                        {/* overview */}
                                        <p className="overview py-2 text-lg text-neutral-400">
                                            {overview}
                                        </p>
                                    </div>
                                </div>

                                {episodes?.length > 0 ? (
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-semibold">{`Episodes (${episodes.length})`}</h1>
                                        <div className="py-5 flex flex-col gap-10">
                                            {episodes?.map((item, index) => (
                                                <motion.div
                                                    whileHover={{scale:1.02}}
                                                    key={index}
                                                >
                                                    <Link
                                                        to={`episode/${item.episode_number}`}
                                                        className="flex flex-col md:flex-row gap-2 md:gap-10 w-full md:w-[80%]"
                                                    >
                                                        <EpisodeCard
                                                            item={item}
                                                            index={index}
                                                        />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {cast.length > 0 ? (
                                    <div className="mt-5">
                                        <h1 className="text-3xl md:text-4xl font-semibold">{`Cast (${cast?.length})`}</h1>
                                        <div className="py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 justify-items-center">
                                            <Cast cast={cast} />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {images?.posters.length > 0 ? (
                                    <div className="">
                                        <h1 className="text-3xl md:text-4xl font-semibold">{`Posters (${images?.posters.length})`}</h1>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-5 justify-items-center">
                                            <Posters
                                                title={tvName}
                                                posters={images?.posters}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
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

export default TvSeason;
