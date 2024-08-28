import React, { Fragment, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import ReviewCard from "./ReviewCard";
import SkeletonReview from "./SkeletonReview";
import Cast from "./Cast";
import { formatDate } from "../../utils/helper";
import Download from "./Download";
import { defaultConst } from "../../utils/constants";
import Casts from "../svg/Casts";
import Backdrops from "../svg/Backdrops";
import Posters from "../svg/Posters";
import Reviews from "../svg/Reviews";
import Seasons from "../svg/Seasons";
import { Link } from "react-router-dom";

const TvInfoTab = ({
    title,
    cast,
    seasons,
    reviewsData,
    backdrops,
    posters,
}) => {
    const options = [
        {
            name: "Cast",
            value: "cast",
            icon: (color) => <Casts color={color} />,
        },
        {
            name: "Seasons",
            value: "season",
            icon: (color) => <Seasons color={color} />,
        },
        {
            name: "Reviews",
            value: "review",
            icon: (color) => <Reviews color={color} />,
        },
        {
            name: "Pictures",
            value: "backdrop",
            icon: (color) => <Backdrops color={color} />,
        },
        {
            name: "Posters",
            value: "poster",
            icon: (color) => <Posters color={color} />,
        },
    ];

    const {
        reviews,
        reviewPage,
        setReviewPage,
        reviewError,
        reviewsLoading,
        reviewsTotalPages,
    } = reviewsData;

    const [selectedType, setSelectedType] = useState("cast");

    const [value, setValue] = useLocalStorage({
        key: "tvInfoTab",
        defaultValue: selectedType,
    });

    const [castPage, setCastPage] = useState(21);
    const [backdropPage, setBackdropPage] = useState(10);
    const [posterPage, setPosterPage] = useState(16);

    useEffect(() => {
        if (value) setSelectedType(value);
    }, []);

    useEffect(() => {
        setValue(selectedType);
    }, [selectedType]);

    const length = options.length;

    const loadMoreReviews = () => {
        setReviewPage((prev) => {
            if (prev < reviewsTotalPages) return prev + 1;
        });
    };

    const today = new Date();

    return (
        <>
            <div className="border-2 w-[90%] sm:w-[70%] md:w-fit select-none p-[2px] bg-neutral-200 rounded-xl">
                <ul className="flex justify-between gap-1 relative w-full text-black">
                    {options.map((item, index) => (
                        <li
                            key={item.name}
                            onClick={() => setSelectedType(item.value)}
                            style={{ width: `${Math.floor(100 / length)}%` }}
                            className={`relative z-10 text-xs md:text-xl truncate font-normal md:font-semibold cursor-pointer rounded-xl py-2 md:px-10 flex flex-col gap-1 justify-center items-center ${
                                selectedType === item.value ? "text-white" : ""
                            }`}
                        >
                            {item.icon(
                                selectedType === item.value ? "#fff" : "#000"
                            )}
                            {item.name}
                        </li>
                    ))}
                    <li
                        style={{
                            width: `${Math.floor(100 / length)}%`,
                            transform: `translateX(${
                                options.findIndex(
                                    (item) => item.value === selectedType
                                ) * 100
                            }%)`,
                        }}
                        className={`absolute top-0 left-0 h-full transform transition-transform duration-300 ease-[cubic-bezier(0.25, 1, 0.5, 1)] bg-[#c147e9] rounded-lg`}
                    ></li>
                </ul>
            </div>
            <div className="w-full px-5 md:px-14 py-5 md:py-12">
                {/* Cast */}
                {selectedType === "cast" &&
                    (cast?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 justify-items-center">
                                <Cast cast={cast?.slice(0, castPage)} />
                                {cast?.length > castPage && (
                                    <button
                                        onClick={() =>
                                            setCastPage((prev) => prev + 21)
                                        }
                                        className="col-span-full select-none m-5 px-4 py-1 bg-[#c147e9] rounded-md text-[#0f0617] text-xl hover:bg-[#d564fb]"
                                    >
                                        Load more
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-3xl text-center text-neutral-300 italic">
                            To be added later.
                        </p>
                    ))}

                {/* Seasons */}
                {selectedType === "season" &&
                    (seasons?.length > 0 ? (
                        <div>
                            <div className="mt-5 flex flex-col gap-5 items-center w-full">
                                {seasons?.map((item, index) => (
                                    <Link
                                        to={`season/${item.season_number}`}
                                        key={index}
                                        className="flex border border-neutral-200 w-full md:w-[80%] h-40 md:h-44 rounded-xl overflow-hidden"
                                    >
                                        <div className="w-40 md:w-36 h-full">
                                            <img
                                                className="object-center object-cover bg-neutral-500"
                                                src={
                                                    item.poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                        : defaultConst.imgPlaceholder
                                                }
                                                alt=""
                                                width={500}
                                                height={750}
                                            />
                                        </div>
                                        <div className="bg-neutral-200 text-neutral-900 flex flex-col items-start justify-center w-full p-3 md:p-5">
                                            <h1 className="text-xl md:text-3xl leading-6 font-semibold">
                                                {item.name}{" "}
                                                {today <
                                                    new Date(item.air_date) &&
                                                today !==
                                                    new Date(item.air_date)
                                                    ? " (Upcoming)"
                                                    : ""}
                                            </h1>
                                            <h1 className="flex gap-1 md:gap-2 items-center text-sm md:text-xl font-medium md:mt-1">
                                                {item.air_date
                                                    ? formatDate({
                                                          date: item.air_date,
                                                          year: true,
                                                          month: true,
                                                          day: true,
                                                      })
                                                    : "NA"}
                                                <i className="w-2 h-2 rounded-full bg-[#c147e9]"></i>
                                                {item.episode_count} Episodes
                                            </h1>
                                            <p className="font-light leading-tight line-clamp-4 md:line-clamp-3 text-sm mt-1 md:mt-2">
                                                {item.overview}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-3xl text-center text-neutral-300 italic">
                            No info yet.
                        </p>
                    ))}

                {/* Reviews */}
                {selectedType === "review" &&
                    (reviews?.length > 0 ? (
                        <>
                            <div>
                                <div className="flex justify-center">
                                    <div className="w-full md:w-[70%]">
                                        {reviews?.map((item, index) => (
                                            <Fragment key={index}>
                                                <ReviewCard {...item} />
                                                {index !==
                                                    reviews.length - 1 && (
                                                    <hr className="my-5 md:my-10 border-neutral-700" />
                                                )}
                                            </Fragment>
                                        ))}
                                        {reviewsLoading && <SkeletonReview />}
                                    </div>
                                </div>
                            </div>
                            {reviewsTotalPages > reviewPage && (
                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={loadMoreReviews}
                                        className="m-5 px-4 py-1 bg-[#c147e9] select-none rounded-md text-[#0f0617] text-xl hover:bg-[#d564fb]"
                                    >
                                        View more
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-3xl text-center text-neutral-300 italic">
                            No reviews yet.
                        </p>
                    ))}

                {/* Backdrops */}
                {selectedType === "backdrop" &&
                    (backdrops?.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {backdrops
                                    ?.slice(0, backdropPage)
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl overflow-hidden relative shadow-md shadow-neutral-900"
                                        >
                                            <img
                                                width={1280}
                                                height={720}
                                                className="object-cover object-center bg-zinc-600"
                                                src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                                                alt=""
                                            />
                                            {item.file_path && (
                                                <Download
                                                    title={title}
                                                    file_path={item.file_path}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                            {backdrops?.length > backdropPage && (
                                <div className="flex justify-center my-5">
                                    <button
                                        onClick={() =>
                                            setBackdropPage((prev) => prev + 10)
                                        }
                                        className="select-none m-5 px-4 py-1 bg-[#c147e9] rounded-md text-[#0f0617] text-xl hover:bg-[#d564fb]"
                                    >
                                        Load more
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-3xl text-center text-neutral-300 italic">
                            No pictures yet.
                        </p>
                    ))}

                {/* Poster */}
                {selectedType === "poster" &&
                    (posters?.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {posters
                                    ?.slice(0, posterPage)
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl overflow-hidden relative shadow-md shadow-neutral-900"
                                        >
                                            <img
                                                width={500}
                                                height={750}
                                                className="object-cover object-center bg-zinc-600"
                                                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                                alt=""
                                            />
                                            {item.file_path && (
                                                <Download
                                                    title={title}
                                                    file_path={item.file_path}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                            {posters?.length > posterPage && (
                                <div className="flex justify-center my-5">
                                    <button
                                        onClick={() =>
                                            setPosterPage((prev) => prev + 12)
                                        }
                                        className="select-none m-5 px-4 py-1 bg-[#c147e9] rounded-md text-[#0f0617] text-xl hover:bg-[#d564fb]"
                                    >
                                        Load more
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-3xl text-center text-neutral-300 italic">
                            No posters yet.
                        </p>
                    ))}
            </div>
        </>
    );
};

export default TvInfoTab;
