import React from "react";
import SkeletonRcmd from "../skeleton/SkeletonRcmd";
import { defaultConst } from "../../../utils/constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Recommendations = ({ data }) => {
    const {
        recommendations,
        rcmdLoading,
        rcmdError,
        rcmdTotalPages,
        rcmdPage,
        setRcmdPage,
        route,
    } = data;

    const loadMoreRcmd = () => {
        setRcmdPage((prev) => {
            if (prev < rcmdTotalPages) return prev + 1;
        });
    };

    return (
        <div className="rcmd px-5 md:px-14">
            <h1 className="text-3xl md:text-[42px] font-bold text-center pb-8">
                More Like This
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
                {recommendations?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link
                            to={`/${route}/${item.id}-${(
                                item.title ||
                                item.original_title ||
                                item.name ||
                                item.original_name
                            )
                                .split(" ")
                                .join("_")}`}
                            className="flex flex-col gap-1 md:gap-3 justify-start"
                        >
                            <img
                                src={
                                    item.backdrop_path
                                        ? `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`
                                        : defaultConst.wideImgPlaceholder
                                }
                                alt=""
                                className="object-cover object-center rounded-md bg-neutral-600 border border-neutral-800 shadow-xl shadow-neutral-950"
                                width={500}
                                height={281}
                            />
                            <h1 className="text-base md:text-lg font-light text-center">
                                {item.title ||
                                    item.original_title ||
                                    item.name ||
                                    item.original_name}
                            </h1>
                        </Link>
                    </motion.div>
                ))}
                {rcmdLoading && <SkeletonRcmd />}
            </div>
            {rcmdError && (
                <p className="text-lg italic text-center text-neutral-500 py-10">
                    {rcmdError}
                </p>
            )}
            {rcmdPage < rcmdTotalPages && rcmdError === null && (
                <div className="flex justify-center mt-5">
                    <motion.button
                        whileHover={{ backgroundColor: "#c147e9", scale: 1.05 }}
                        className={`w-36 py-2 my-5 ${
                            rcmdLoading && "cursor-not-allowed"
                        } text-xl font-medium rounded-lg white-black flex items-center justify-center`}
                        disabled={rcmdLoading ? true : false}
                        onClick={loadMoreRcmd}
                    >
                        {rcmdLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-[#0f0617]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            "View more"
                        )}
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default Recommendations;
