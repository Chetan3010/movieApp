import React, { useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import Topnav from "../../partials/topnav/Topnav";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints } from "../../../utils/constants";
import { formatDate, formatRuntime, getRating } from "../../../utils/helper";
import MovieInfoTab from "../../partials/infoPages/movie/MovieInfoTab";
import Collection from "../../partials/infoPages/Collection";
import Recommendations from "../../partials/infoPages/Recommendations";
import InfoPoster from "../../partials/infoPages/InfoPoster";
import Facts from "../../partials/infoPages/Facts";
import Loader from "../../partials/global/Loader";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";
import { Toaster } from "react-hot-toast";

const MovieInfo = () => {
    const para = useParams();
    const id = para.id.split("-")[0];

    const [reviewPage, setReviewPage] = useState(1);
    const [rcmdPage, setRcmdPage] = useState(1);

    const { data: info, isPending } = useFetch(
        apiEndpoints.movie.details({ id })
    );

    const {
        data: reviews,
        isPending: reviewsLoading,
        totalPages: reviewsTotalPages,
        error: reviewError,
    } = useFetch(apiEndpoints.movie.reviews({ id, page: reviewPage }));

    const {
        data: recommendations,
        isPending: rcmdLoading,
        totalPages: rcmdTotalPages,
        error: rcmdError,
    } = useFetch(apiEndpoints.movie.recommendations({ id, page: rcmdPage }));

    const {
        backdrop_path,
        belongs_to_collection, // -> object
        budget,
        genres,
        homepage,
        original_language,
        original_title,
        overview,
        poster_path,
        release_date,
        revenue,
        runtime,
        spoken_languages, // array.object
        status,
        tagline,
        title,
        vote_average,
        images, // poster, logos, backdrops -> array
        videos, // results -> array
        credits, // cast crew
        external_ids,
    } = info;

    const trailer = videos?.results?.find(
        (item) => item?.site === "YouTube" && item?.type === "Trailer"
    );

    
    const directors =
        credits?.crew
            ?.filter((credit) => credit?.job === "Director")
            .slice(0, 2) ?? [];
    const writer =
        credits?.crew
            ?.filter((credit) => credit?.job === "Writer")
            .slice(0, 3) ?? [];
    const characters =
        credits?.crew
            ?.filter((credit) => credit?.job === "Characters")
            .slice(0, 2) ?? [];

    const crewData = [...directors, ...writer, ...characters];

    const rating = getRating(vote_average);

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
            title: "Budget",
            value: budget ? `$${Intl.NumberFormat().format(budget)}` : "-",
            link: null,
        },
        {
            title: "Revenue",
            value: revenue ? `$${Intl.NumberFormat().format(revenue)}` : "-",
            link: null,
        },
    ];

    return (
        <>
            <Toaster position="bottom-center" />
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                {!isPending ? (
                    <div className="w-full relative bg-[#0F0617] py-5">
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
                                <h1 className="text-3xl md:text-4xl font-semibold md:font-bold">
                                    {title || original_title}
                                </h1>

                                {/* date, genres, runtime */}
                                <div className="my-4 info flex flex-col justify-start md:flex-row md:items-center flex-wrap md:gap-3 text-lg md:text-xl md:font-medium">
                                    <h3 className="flex md:block items-center gap-2">
                                        <i className="w-2 h-2 bg-[#c147e9] rounded-full md:hidden"></i>
                                        {release_date
                                            ? formatDate({
                                                  date: release_date,
                                                  year: true,
                                                  month: true,
                                                  day: true,
                                              })
                                            : "TBA"}
                                    </h3>

                                    {genres?.length > 0 ? (
                                        <>
                                            <div className="flex gap-2 items-center">
                                                <i className="w-2 h-2 bg-[#c147e9] rounded-full "></i>
                                                {genres.map((item, index) => (
                                                    <Link
                                                        to={`/genre/movies/${
                                                            item.id
                                                        }-${item?.name
                                                            .split(" ")
                                                            .join("_")}`}
                                                        key={index}
                                                        className="md:border-2 border-neutral-400 underline underline-offset-2 whitespace-nowrap md:no-underline text-sm md:text-base lg:text-lg font-extralight md:font-medium rounded-full md:px-3 md:py-1 md:hover:bg-[#c147e9] md:hover:text-[#0f0617] md:hover:border-[#0f0617] transition-all ease-in duration-200 cursor-pointer"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {runtime ? (
                                        <div className="flex items-center gap-2">
                                            <i className="w-2 h-2 bg-[#c147e9] rounded-full"></i>
                                            <h3>{formatRuntime(runtime)}</h3>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                {/* tagline */}
                                {tagline && (
                                    <h3 className="tagline italic text-xl text-neutral-300 font-light mt-1">
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
                                <div className="crew py-5 flex flex-wrap gap-5 text-lg md:text-xl">
                                    {crewData.map((item, index) => (
                                        <Link
                                            to={`/person/${item.id}-${item.name
                                                .split(" ")
                                                .join("_")}`}
                                            key={index}
                                        >
                                            <h3 className="">{item.job}</h3>
                                            <h3 className="font-semibold tracking-wide md:font-bold underline hover:text-[#c147e9] cursor-pointer">
                                                {item.name ||
                                                    item.original_name}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>

                                {/* Collection */}
                                {belongs_to_collection && (
                                    <Collection {...belongs_to_collection} />
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
                                <MovieInfoTab
                                    cast={credits?.cast}
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
                                    title={title || original_title}
                                />
                            </div>
                        </div>

                        {recommendations?.length > 0 && (
                            <Recommendations
                                data={{
                                    route: "movie",
                                    recommendations,
                                    rcmdLoading,
                                    rcmdError,
                                    rcmdTotalPages,
                                    rcmdPage,
                                    setRcmdPage,
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div className="w-full h-[80vh] flex justify-center items-center">
                        <Loader classname={"w-16 h-16"} />
                    </div>
                )}
            </section>
        </>
    );
};

export default MovieInfo;
