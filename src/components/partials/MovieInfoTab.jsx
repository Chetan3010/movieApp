import React, { Fragment, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { FaImage, FaPeopleGroup } from "react-icons/fa6";
import { MdFileDownload, MdPhotoAlbum, MdRateReview } from "react-icons/md";
import Cast from "./Cast";
import ReviewCard from "./ReviewCard";
import { saveAs } from "file-saver";
import { getFileName } from "../../utils/helper";
import SkeletonReview from "./SkeletonReview";

const MovieInfoTab = ({ title, cast, reviewsData, backdrops, posters }) => {
    const options = [
        { name: "Cast", value: "cast", icon: <FaPeopleGroup /> },
        { name: "Reviews", value: "review", icon: <MdRateReview /> },
        { name: "Pictures", value: "backdrop", icon: <FaImage /> },
        { name: "Posters", value: "poster", icon: <MdPhotoAlbum /> },
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
        setReviewPage(prev => {
            if(prev < reviewsTotalPages) return prev+1
        })
    }

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
                                selectedType === item.value
                                    ? "text-white"
                                    : ""
                            }`}
                        >
                            {item.icon}
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
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-5 justify-items-center">
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
                                        { reviewsLoading && <SkeletonReview /> }
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
                                                <button
                                                    onClick={() => {
                                                        saveAs(
                                                            `https:image.tmdb.org/t/p/original${item.file_path}`,
                                                            getFileName({
                                                                title,
                                                                file: item.file_path,
                                                            })
                                                        );
                                                    }}
                                                    className="w-8 h-8 bg-neutral-300 rounded-md text-black text-lg flex justify-center items-center absolute right-5 bottom-5"
                                                >
                                                    <MdFileDownload />
                                                </button>
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
                                                <button
                                                    onClick={() => {
                                                        saveAs(
                                                            `https:image.tmdb.org/t/p/original${item.file_path}`,
                                                            getFileName({
                                                                title,
                                                                file: item.file_path,
                                                            })
                                                        );
                                                    }}
                                                    className="w-8 h-8 bg-neutral-300 rounded-md text-black text-lg flex justify-center items-center absolute right-5 bottom-5"
                                                >
                                                    <MdFileDownload />
                                                </button>
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

export default MovieInfoTab;
