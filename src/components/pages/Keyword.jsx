import React, { useState } from "react";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import Topnav from "../partials/topnav/Topnav";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints } from "../../utils/constants";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import SearchDataCard from "../partials/global/SearchDataCard";
import SearchDataSkeleton from "../partials/skeleton/SearchDataSkeleton";
import { getEndOfScrollPhrase } from "../../utils/helper";
import { AnimatePresence, motion } from "framer-motion";
import Error from "./Error";

const Keyword = () => {
    const para = useParams();
    const id = para.id.split("-")[0];
    const keywordName = para.id.split("-")[1].split("_").join(" ");

    const [page, setPage] = useState(1);
    const { data, error, isPending, setData, totalPages, totalResults } =
        useFetch(apiEndpoints.keyword.keywordList({ id, page }));

    const { isDone, lastItemRef } = useInfiniteScroll({
        isPending,
        page,
        setPage,
        totalPages,
    });

    if(error){
        return <Error status={error.status} />
    }

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <div className="w-full px-5 md:px-14 mt-4 md:mt-8">
                    <AnimatePresence mode="wait">
                        {data?.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={"keyowrd"}
                            >
                                <h1 className="text-lg md:text-2xl text-neutral-300">
                                    Results Matching : {keywordName}
                                </h1>
                                <div className="w-full">
                                    <div className="w-full flex flex-col gap-5 items-center py-5">
                                        <>
                                            {data.map((item, index) => {
                                                if (data.length - 1 === index) {
                                                    return (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.02,
                                                            }}
                                                            className="w-full"
                                                            key={index}
                                                        >
                                                            <Link
                                                                ref={
                                                                    lastItemRef
                                                                }
                                                                to={`/movie/${
                                                                    item.id
                                                                }-${item.title
                                                                    .split(" ")
                                                                    .join(
                                                                        "_"
                                                                    )}`}
                                                                className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden border border-neutral-600"
                                                            >
                                                                <SearchDataCard
                                                                    item={item}
                                                                />
                                                            </Link>
                                                        </motion.div>
                                                    );
                                                }
                                                return (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        className="w-full"
                                                        key={index}
                                                    >
                                                        <Link
                                                            to={`/movie/${
                                                                item.id
                                                            }-${item.title
                                                                .split(" ")
                                                                .join("_")}`}
                                                            className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden border border-neutral-600"
                                                        >
                                                            <SearchDataCard
                                                                item={item}
                                                            />
                                                        </Link>
                                                    </motion.div>
                                                );
                                            })}

                                            {/* Skeleton Cars */}
                                            {isPending && !isDone && (
                                                <SearchDataSkeleton />
                                            )}

                                            {isDone && (
                                                <h1 className="italic text-sm text-gray-300 text-center col-span-full my-5">
                                                    {getEndOfScrollPhrase()}
                                                </h1>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={"loader"}
                                className="w-full h-[70vh] flex justify-center items-center"
                            >
                                <p className="text-xl italic md:text-5xl text-neutral-500">
                                    No result for this keyword.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
};

export default Keyword;
