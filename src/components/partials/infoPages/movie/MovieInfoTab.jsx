import React, { Fragment, useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import Cast from "../Cast";
import ReviewCard from "../ReviewCard";
import SkeletonReview from "../../skeleton/SkeletonReview";
import Casts from "../../../svg/Casts";
import Reviews from "../../../svg/Reviews";
import BackdropsSvg from "../../../svg/Backdrops";
import PostersSvg from "../../../svg/Posters";
import Backdrops from "../Backdrops";
import Posters from "../Posters";
import { AnimatePresence, motion } from "framer-motion";

const MovieInfoTab = ({ title, cast, reviewsData, backdrops, posters }) => {
    const options = [
        {
            name: "Cast",
            value: "cast",
            icon: (color) => <Casts color={color} />,
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
        key: "movieInfoTab",
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
            <div className="border-2 w-[90%] md:w-fit select-none p-[2px] bg-neutral-200 rounded-xl">
                <ul className="flex justify-between gap-1 relative w-full text-black">
                    {options.map((item, index) => (
                        <li
                            key={item.name}
                            onClick={() => setSelectedType(item.value)}
                            style={{ width: `${Math.floor(100 / length)}%` }}
                            className={`relative z-10 text-sm md:text-xl truncate font-normal md:font-semibold cursor-pointer rounded-xl py-2 md:px-10 flex flex-col justify-center items-center ${
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
                                                            <hr className="my-5 md:my-10 border-neutral-700" />
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
                                                whileHover={{ backgroundColor: '#c147e9' }}
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
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
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

export default MovieInfoTab;
