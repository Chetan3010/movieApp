import React, { Fragment, useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import ReviewCard from "../ReviewCard";
import SkeletonReview from "../../skeleton/SkeletonReview";
import Cast from "../Cast";
import Casts from "../../../svg/Casts";
import BackdropsSvg from "../../../svg/BackdropsSvg";
import PostersSvg from "../../../svg/PostersSvg";
import Reviews from "../../../svg/Reviews";
import Seasons from "../../../svg/Seasons";
import { Link } from "react-router-dom";
import Backdrops from "../Backdrops";
import Posters from "../Posters";
import SeasonCard from "./SeasonCard";
import { AnimatePresence, motion } from "framer-motion";

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
            icon: (color) => <BackdropsSvg color={color} />,
        },
        {
            name: "Posters",
            value: "poster",
            icon: (color) => <PostersSvg color={color} />,
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
                <AnimatePresence mode="wait">
                    {/* Cast */}
                    {selectedType === "cast" && (
                        <motion.div
                            key={"cast"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {cast?.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 justify-items-center">
                                        <Cast cast={cast} />
                                    </div>
                                </>
                            ) : (
                                <p className="text-3xl text-center text-neutral-300 italic">
                                    To be added later.
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Seasons */}
                    {selectedType === "season" && (
                        <motion.div
                            key={"season"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {seasons?.length > 0 ? (
                                <div>
                                    <div className="mt-5 flex flex-col gap-5 items-center w-full">
                                        {seasons?.map((item, index) => (
                                            <motion.div
                                                whileHover={{ scaleX: 1.02 }}
                                                className="w-full md:w-[80%]"
                                                key={index}
                                            >
                                                <Link
                                                    to={`season/${item.season_number}`}
                                                    className="flex border border-neutral-200 w-full h-40 md:h-44 rounded-xl overflow-hidden"
                                                >
                                                    <SeasonCard item={item} />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-3xl text-center text-neutral-300 italic">
                                    No info yet.
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Reviews */}
                    {selectedType === "review" && (
                        <motion.div
                            key={"review"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {reviews?.length > 0 ? (
                                <>
                                    <div>
                                        <div className="flex justify-center">
                                            <div className="w-full md:w-[70%]">
                                                {reviews?.map((item, index) => (
                                                    <Fragment key={index}>
                                                        <ReviewCard {...item} />
                                                        {index !==
                                                            reviews.length -
                                                                1 && (
                                                            <hr className="my-5 md:my-8 border-neutral-700" />
                                                        )}
                                                    </Fragment>
                                                ))}
                                                {reviewsLoading && (
                                                    <SkeletonReview />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {reviewsTotalPages > reviewPage && (
                                        <div className="flex justify-center mt-5">
                                            <motion.button
                                                whileHover={{
                                                    backgroundColor: "#c147e9",
                                                }}
                                                onClick={loadMoreReviews}
                                                className="m-5 px-4 py-1 bg-white select-none font-normal rounded-md text-[#0f0617] text-xl"
                                            >
                                                View more
                                            </motion.button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-3xl text-center text-neutral-300 italic">
                                    No reviews yet.
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Backdrops */}
                    {selectedType === "backdrop" && (
                        <motion.div
                            key={"backdrop"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {backdrops?.length > 0 ? (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
                                        <Backdrops
                                            title={title}
                                            backdrops={backdrops}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className="text-3xl text-center text-neutral-300 italic">
                                    No pictures yet.
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Poster */}
                    {selectedType === "poster" && (
                        <motion.div
                            key={"poster"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {posters?.length > 0 ? (
                                <div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                                        <Posters
                                            title={title}
                                            posters={posters}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className="text-3xl text-center text-neutral-300 italic">
                                    No posters yet.
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default TvInfoTab;
