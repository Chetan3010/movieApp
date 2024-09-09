import React, { useEffect, useState } from "react";
import Loader from "../partials/global/Loader";
import Topnav from "../partials/topnav/Topnav";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../utils/constants";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FaLink, FaLocationDot } from "react-icons/fa6";
import DropdownMenu from "../partials/global/DropdownMenu";
import Cards from "../partials/global/Cards";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const Network = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const para = useParams();
    const id = para.id.split("-")[0];

    const [page, setPage] = useState(1);
    const sortByOptions = defaultConst.tvSortOptions;
    const sortBy = searchParams.get("sortBy") || sortByOptions[0].value;

    const { data: networkInfo, isPending: isLoading } = useFetch(
        apiEndpoints.network.networkInfo({ id })
    );
    const { headquarters, homepage, name, logo_path, origin_country } =
        networkInfo;

    const {
        data: tvshows,
        error,
        isPending,
        totalPages,
        setData,
        totalResults,
    } = useFetch(apiEndpoints.network.networkList({ id, page, sortBy }));

    const { isDone, lastItemRef } = useInfiniteScroll({
        isPending,
        page,
        setPage,
        totalPages,
    });

    const { data: posterList } = useFetch(
        apiEndpoints.network.networkList({ id })
    );

    const posters = posterList
        .slice(0, 20)
        .filter(({ poster_path }) => poster_path !== null)
        .map(({ poster_path }) => poster_path);
    const isMasonry = posters?.length > 10 ? true : false;
    const gridColCount =
        posters.length > 10 ? posters.length / 2 : posters.length;

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
                {!isLoading ? (
                    <div className="w-full">
                        <div className="w-full relative">
                            <div
                                className={`w-full grid blur-sm 
                                grid-cols-${
                                    gridColCount > 4 ? "4" : gridColCount
                                } 
                                sm:grid-cols-${
                                    gridColCount > 6 ? "6" : gridColCount
                                } 
                                md:grid-cols-${
                                    gridColCount > 8 ? "8" : gridColCount
                                } 
                                lg:grid-cols-10
                                justify-items-stretch gap-3 md:gap-5 h-64 overflow-hidden overlay`}
                            >
                                {posters.map((item, index) => (
                                    <img
                                        className={`rounded-xl select-none ${
                                            isMasonry && index % 2 === 1
                                                ? "-translate-y-[50%]"
                                                : ""
                                        }`}
                                        key={index}
                                        src={`https://image.tmdb.org/t/p/w185${item}`}
                                        alt=""
                                    />
                                ))}
                            </div>
                            <div className="absolute w-full h-full left-0 top-0 flex flex-col items-center justify-center gap-5">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${logo_path}`}
                                    alt=""
                                    className="w-32 md:w-48 object-contain"
                                />
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-10 text-lg md:text-xl font-semibold">
                                    <h1>{name}</h1>
                                    <h1 className="flex items-center gap-1">
                                        <FaLocationDot />
                                        {headquarters}
                                    </h1>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={homepage}
                                        className="flex items-center gap-1 underline underline-offset-2 decoration-dotted hover:text-[#c147e9] transition-all"
                                    >
                                        <FaLink />
                                        Homepage
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5 md:px-14 flex justify-end gap-5 items-center">
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
                        <div className="cardDrawer mt-5">
                            <Cards
                                items={tvshows}
                                isPending={isPending}
                                isInfiniteScroll
                                lastItemRef={lastItemRef}
                                error={error}
                                isDone={isDone}
                                route={"tv"}
                            />
                        </div>
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

export default Network;
