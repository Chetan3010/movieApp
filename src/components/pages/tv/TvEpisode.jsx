import React from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Topnav from "../../partials/topnav/Topnav";
import BreadcrumpLinks from "../../partials/global/BreadcrumpLinks";
import { formatDate, formatRuntime, getRating } from "../../../utils/helper";
import { apiEndpoints, defaultConst } from "../../../utils/constants";
import useFetch from "../../../hooks/useFetch";
import Share from "../../partials/global/Share";
import Cast from "../../partials/infoPages/Cast";
import Backdrops from "../../partials/infoPages/Backdrops";
import Loader from "../../partials/global/Loader";

const TvEpisode = () => {
    const para = useParams();
    const id = para.id.split("-")[0];

    const sid = para.sid;
    const eid = para.eid;
    const tvName = para.id.split("-")[1].split("_").join(" ");

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
            link: `/tv/${para.id}/season/${sid}`,
        },
        {
            label: `Episode ${eid}`,
            link: null,
        },
    ];

    const { data: episodeDetails, isPending } = useFetch(
        apiEndpoints.tv.episode({ id, sid, eid })
    );

    const {
        air_date,
        episodes, // array of objects
        name,
        runtime,
        overview,
        still_path,
        credits,
        episode_number,
        vote_average,
        images,
    } = episodeDetails;

    const rating = getRating(vote_average);

    return (
        <section className="main">
            <Topnav />
            {!isPending ? (
                <div className="w-full">
                    <div className="px-5 md:px-14 mt-2">
                        <BreadcrumpLinks links={links} />
                        <div className="my-4 md:my-8 grid sm:grid-flow-col gap-6 sm:gap-10 place-items-center sm:place-items-start sm:justify-start">
                            <div className="w-full md:w-72 rounded-xl overflow-hidden">
                                <img
                                    className="bg-zinc-600 object-center w-full h-full object-cover"
                                    src={
                                        still_path
                                            ? `https://image.tmdb.org/t/p/original${still_path}`
                                            : defaultConst.wideImgPlaceholder
                                    }
                                    width={1280}
                                    height={720}
                                />
                            </div>
                            <div className="w-full">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold md:font-bold whitespace-wrap">
                                    {name
                                        ? name
                                        : ` Episode ${episode_number ?? ""}`}
                                    {sid && eid && ` (S${sid}E${eid})`}
                                </h1>

                                {/* date, rating, runtime */}
                                <div className="my-2 info flex flex-col justify-start md:flex-row md:items-center flex-wrap gap-2 md:gap-3 text-lg md:text-xl md:font-medium">
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
                                    {runtime ? (
                                        <h3 className="flex items-center gap-2">
                                            <i className="w-2 h-2 bg-[#c147e9] rounded-full whitespace-nowrap"></i>
                                            {formatRuntime(runtime)}
                                        </h3>
                                    ) : (
                                        <></>
                                    )}

                                    <h3 className="flex items-center gap-2">
                                        <i className="w-2 h-2 bg-[#c147e9] rounded-full whitespace-nowrap"></i>
                                        <Share />
                                    </h3>
                                </div>

                                {/* overview */}
                                <p className="overview text-lg text-neutral-400">
                                    {overview}
                                </p>
                            </div>
                        </div>

                        {credits?.cast.length > 0 ? (
                            <div className="mt-10">
                                <h1 className="text-3xl md:text-4xl font-semibold">{`Cast (${credits?.cast?.length})`}</h1>
                                <div className="py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 justify-items-center">
                                    <Cast cast={credits?.cast} />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        {/* Backdrops */}
                        {images?.stills?.length > 0 ? (
                            <div className="mt-5">
                                <h1 className="text-3xl md:text-4xl font-semibold">{`Pictures (${images?.stills.length})`}</h1>
                                <div className="grid py-5 grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
                                    <Backdrops
                                        title={tvName}
                                        backdrops={images?.stills}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="text-3xl text-center text-neutral-300 italic">
                                No pictures yet.
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <Loader classname={"w-16 h-16"} />
                </div>
            )}
        </section>
    );
};

export default TvEpisode;
