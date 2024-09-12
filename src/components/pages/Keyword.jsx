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

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <div className="w-full px-5 md:px-14 mt-4 md:mt-8">
                    <h1 className="text-lg md:text-2xl text-neutral-300">
                        Results Matching : {keywordName}
                    </h1>
                    <div className="w-full">
                        <div className="w-full flex flex-col gap-5 items-center py-5">
                            {data?.length > 0 ? (
                                <>
                                    {data.map((item, index) => {
                                        if (data.length - 1 === index) {
                                            return (
                                                <Link
                                                    ref={lastItemRef}
                                                    to={`/movie/${
                                                        item.id
                                                    }-${item.title
                                                        .split(" ")
                                                        .join("_")}`}
                                                    key={index}
                                                    className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden border border-neutral-600"
                                                >
                                                    <SearchDataCard
                                                        item={item}
                                                    />
                                                </Link>
                                            );
                                        }
                                        return (
                                            <Link
                                                to={`/movie/${
                                                    item.id
                                                }-${item.title
                                                    .split(" ")
                                                    .join("_")}`}
                                                key={index}
                                                className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden border border-neutral-600"
                                            >
                                                <SearchDataCard item={item} />
                                            </Link>
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
                            ) : (
                                isPending && <SearchDataSkeleton />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Keyword;
