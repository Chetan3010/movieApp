import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Topnav from "../partials/topnav/Topnav";
import DropdownMenu from "../partials/global/DropdownMenu";
import Cards from "../partials/global/Cards";
import { apiEndpoints, defaultConst } from "../../utils/constants";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch from "../../hooks/useFetch";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";

const GenreTv = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { gid } = useParams();
    const genreId = gid.split("-")[0];
    const genreName = gid.split("-")[1].split("_").join(" ");

    const sortByOptions = defaultConst.tvSortOptions;

    const sortBy = searchParams.get("sortBy") || sortByOptions[0].value;
    const [page, setPage] = useState(1);

    const { data, setData, error, isPending, totalPages } = useFetch(
        apiEndpoints.tv.genreTvList({
            genreId,
            page,
            sortBy,
        })
    );

    const { isDone, lastItemRef } = useInfiniteScroll({
        isPending,
        page,
        setPage,
        totalPages,
    });

    const handleSort = (option) => {
        setData([]);
        setPage(1);
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            sortBy: option,
        });
    };

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <div className="w-full">
                    <div className="px-5 md:px-12 flex flex-col justify-center items-center mt-4 md:mt-8">
                        <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl text-neutral-300 font-semibold">
                            {genreName} TV Shows
                        </h1>
                        <div className="w-full flex justify-end gap-5 items-center">
                            <span className="text-neutral-300 text-lg">
                                Sort By:
                            </span>
                            <div className="w-fit">
                                <DropdownMenu
                                    title={sortByOptions.find(
                                        (option) => option.value === sortBy
                                    )}
                                    defaultOp={sortByOptions[0]}
                                    onSelect={(option) => handleSort(option)}
                                    options={sortByOptions}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cardDrawer mt-5">
                        <Cards
                            items={data}
                            isPending={isPending}
                            isInfiniteScroll
                            lastItemRef={lastItemRef}
                            error={error}
                            isDone={isDone}
                            route={"tv"}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default GenreTv;
