import React, { useState } from "react";
import Topnav from "../../partials/topnav/Topnav";
import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../../utils/constants";
import DropdownMenu from "../../partials/global/DropdownMenu";
import Cards from "../../partials/global/Cards";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";

const MovieProvider = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const para = useParams();
    const pid = para.pid.split("-")[0];
    const pName = para.pid.split("-")[1].split("_").join(" ");

    const sortByOptions = defaultConst.movieSortOptions;

    const region = searchParams.get("region");
    const sortBy = searchParams.get("sortBy") || sortByOptions[0].value;

    const [page, setPage] = useState(1);

    const { data, setData, error, isPending, totalPages } = useFetch(
        apiEndpoints.watchProvider.watchProviderMovies({
            page,
            pid,
            region,
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
                        <h1 className="mb-5 text-neutral-400 text-3xl md:text-4xl font-semibold text-center">
                            Movies available on<br></br>
                            <span className="text-neutral-200">
                                {pName} ({region})
                            </span>
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
                            route={"movie"}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MovieProvider;
