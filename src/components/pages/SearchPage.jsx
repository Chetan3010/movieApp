import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import Topnav from "../partials/topnav/Topnav";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../utils/constants";
import SearchDataCard from "../partials/global/SearchDataCard";
import PeopleCard from "../partials/infoPages/people/PeopleCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import SearchDataSkeleton from "../partials/skeleton/SearchDataSkeleton";
import SkeletonPeopleCard from "../partials/skeleton/SkeletonPeopleCard";
import CollectionSkeleton from "../partials/skeleton/CollectionSkeleton";
import { getBadQueryPhrase } from "../../utils/helper";

const SearchPage = () => {
    const { query } = useParams();
    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const [personPage, setPersonPage] = useState(1);
    const [collectionPage, setCollectionPage] = useState(1);
    const [keywordPage, setKeywordPage] = useState(1);

    const movie = useFetch(
        apiEndpoints.search.movieSearch({ query, page: moviePage })
    );
    const tvshow = useFetch(
        apiEndpoints.search.tvSearch({ query, page: tvPage })
    );
    const person = useFetch(
        apiEndpoints.search.personSearch({ query, page: personPage })
    );
    const collection = useFetch(
        apiEndpoints.search.collectionSearch({ query, page: collectionPage })
    );
    const keyword = useFetch(
        apiEndpoints.search.keywordSearch({ query, page: keywordPage })
    );

    const movieRef = useInfiniteScroll({
        page: moviePage,
        setPage: setMoviePage,
        ...movie,
    });
    const tvRef = useInfiniteScroll({
        page: tvPage,
        setPage: setTvPage,
        ...tvshow,
    });
    const personRef = useInfiniteScroll({
        page: personPage,
        setPage: setPersonPage,
        ...person,
    });
    const colllectionRef = useInfiniteScroll({
        page: collectionPage,
        setPage: setCollectionPage,
        ...collection,
    });
    const keywordRef = useInfiniteScroll({
        page: keywordPage,
        setPage: setKeywordPage,
        ...keyword,
    });

    const tabOptions = [
        {
            key: "movie",
            name: `Movies (${movie.totalResults})`,
        },
        {
            key: "tv",
            name: `TV (${tvshow.totalResults})`,
        },
        {
            key: "person",
            name: `People (${person.totalResults})`,
        },
        {
            key: "collection",
            name: `Collections (${collection.totalResults})`,
        },
        {
            key: "keyword",
            name: `Keywords (${keyword.totalResults})`,
        },
    ];

    const [activeTab, setActiveTab] = useState(tabOptions[0].key);
    const tabContainerRef = useRef(null);
    const [value, setValue] = useLocalStorage({
        key: "searchTab",
        defaultValue: tabOptions[0].key,
    });

    const handleOption = (option) => {
        setActiveTab(option);
        setValue(option);
    };

    useEffect(() => {
        movie.setData([]);
        tvshow.setData([]);
        person.setData([]);
        collection.setData([]);
        keyword.setData([]);
    }, [query]);

    useEffect(() => {
        if (value) setActiveTab(value);
    }, [value]);

    useEffect(() => {
        // scroll to active tab
        if (tabContainerRef?.current) {
            const activeTabElement =
                tabContainerRef.current.querySelector(".current");
            if (activeTabElement) {
                tabContainerRef.current.scrollLeft =
                    activeTabElement.offsetLeft - 150;
            }
        }
    }, [activeTab]);

    const isLoading =
        movie?.isPending ||
        tvshow?.isPending ||
        person?.isPending ||
        collection?.isPending ||
        keyword?.isPending;
    const isEmpty =
        movie?.data.length === 0 &&
        tvshow?.data.length === 0 &&
        person?.data.length === 0 &&
        collection?.data.length === 0 &&
        keyword?.data.length === 0;

    return (
        <>
            <ScrollRestorationCustom />
            <section className={`main`}>
                <Topnav />
                {!isLoading && isEmpty ? (
                    <div className="w-full h-[70vh] flex px-5 justify-center items-center">
                        <h1 className="text-lg sm:text-2xl md:text-5xl text-neutral-400">
                            {getBadQueryPhrase()}
                        </h1>
                    </div>
                ) : (
                    <div className="px-5 md:px-14 py-5">
                        <div className="w-full flex justify-center">
                            <div
                                ref={tabContainerRef}
                                className="mt-5 lg:w-[85%] overflow-y-scroll hideScrollbar border-b border-neutral-500 flex"
                            >
                                {tabOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOption(item.key)}
                                        style={{
                                            transform:
                                                "cubic-bezier(0, 0.55, 0.45, 1)",
                                        }}
                                        className={`relative flex-shrink-0 w-36 lg:w-1/5 overflow-hidden py-2 ${
                                            activeTab === item.key
                                                ? "bg-[#c147e9] text-white current"
                                                : "text-neutral-300 bg-transparent"
                                        } text-sm lg:text-xl font-medium lg:font-semibold flex justify-center transition duration-300 items-center cursor-pointer rounded-t-lg`}
                                    >
                                        <span className="select-none">
                                            {item.name}
                                        </span>
                                        {activeTab === item.key && (
                                            <div
                                                className={`w-full h-1 absolute bottom-0 bg-white activeTab animateTab`}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Movies */}
                        {activeTab === "movie" && (
                            <div className="w-full">
                                {movie?.data?.length > 0 ? (
                                    <div className="w-full flex flex-col gap-5 items-center py-5 md:py-10">
                                        {movie.data.map((item, index) => {
                                            if (
                                                movie.data.length - 1 ===
                                                index
                                            ) {
                                                return (
                                                    <Link
                                                        ref={
                                                            movieRef.lastItemRef
                                                        }
                                                        to={`/movie/${
                                                            item.id
                                                        }-${item.title
                                                            .split(" ")
                                                            .join("_")}`}
                                                        key={index}
                                                        className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
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
                                                    className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
                                                >
                                                    <SearchDataCard
                                                        item={item}
                                                    />
                                                </Link>
                                            );
                                        })}

                                        {/* Skeleton Cars */}
                                        {movie.isPending &&
                                            !movieRef.isDone && (
                                                <SearchDataSkeleton />
                                            )}
                                    </div>
                                ) : (
                                    <div className="w-full h-[70vh] flex px-5 justify-center items-center">
                                        <h1 className="text-lg sm:text-2xl md:text-5xl text-neutral-400">
                                            No matching movie found: {query}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tv Shows */}
                        {activeTab === "tv" && (
                            <div className="w-full">
                                {tvshow?.data?.length > 0 ? (
                                    <div className="w-full flex flex-col gap-5 items-center py-5 md:py-10">
                                        {tvshow.data.map((item, index) => {
                                            if (
                                                tvshow.data.length - 1 ===
                                                index
                                            ) {
                                                return (
                                                    <Link
                                                        ref={tvRef.lastItemRef}
                                                        to={`/tv/${
                                                            item.id
                                                        }-${item.name
                                                            .split(" ")
                                                            .join("_")}`}
                                                        key={index}
                                                        className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
                                                    >
                                                        <SearchDataCard
                                                            item={item}
                                                        />
                                                    </Link>
                                                );
                                            }
                                            return (
                                                <Link
                                                    to={`/tv/${
                                                        item.id
                                                    }-${item.name
                                                        .split(" ")
                                                        .join("_")}`}
                                                    key={index}
                                                    className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
                                                >
                                                    <SearchDataCard
                                                        item={item}
                                                    />
                                                </Link>
                                            );
                                        })}

                                        {/* Skeleton Cars */}
                                        {tvshow.isPending && !tvRef.isDone && (
                                            <SearchDataSkeleton />
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full h-[70vh] flex px-5 justify-center items-center">
                                        <h1 className="text-lg sm:text-2xl md:text-5xl text-neutral-400">
                                            No matching tv shows found: {query}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Persons */}
                        {activeTab === "person" && (
                            <div className="w-full">
                                {person?.data?.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-12 mt-4 md:mt-8 px-4 md:px-12">
                                        {person.data.map((item, index) => {
                                            if (
                                                person.data.length - 1 ===
                                                index
                                            ) {
                                                return (
                                                    <PeopleCard
                                                        ref={
                                                            personRef.lastItemRef
                                                        }
                                                        {...item}
                                                        key={index}
                                                    />
                                                );
                                            }
                                            return (
                                                <PeopleCard
                                                    {...item}
                                                    key={index}
                                                />
                                            );
                                        })}

                                        {/* Skeleton People Cards */}
                                        {person.isPending && !tvRef.isDone && (
                                            <SkeletonPeopleCard />
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full h-[70vh] flex px-5 justify-center items-center">
                                        <h1 className="text-lg sm:text-2xl md:text-5xl text-neutral-400">
                                            No matching people found: {query}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Collections */}
                        {activeTab === "collection" && (
                            <div className="w-full">
                                {collection.data.length > 0 ? (
                                    <div className="w-full py-5 md:py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
                                        {collection.data.map((item, index) => {
                                            if (
                                                collection.data.length - 1 ===
                                                index
                                            ) {
                                                return (
                                                    <Link
                                                        ref={
                                                            colllectionRef.lastItemRef
                                                        }
                                                        to={`/collection/${
                                                            item.id
                                                        }-${item.name
                                                            .split(" ")
                                                            .join("_")}`}
                                                        key={index}
                                                        className="flex flex-col items-center gap-2 md:gap-5"
                                                    >
                                                        <img
                                                            width={500}
                                                            height={281}
                                                            className="object-cover object-center w-full rounded-lg bg-zinc-600"
                                                            src={
                                                                item.backdrop_path
                                                                    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                                                    : defaultConst.wideImgPlaceholder
                                                            }
                                                            alt=""
                                                        />
                                                        <h1 className="text-base md:text-lg text-neutral-200 text-center">
                                                            {item.name}
                                                        </h1>
                                                    </Link>
                                                );
                                            }
                                            return (
                                                <Link
                                                    to={`/collection/${
                                                        item.id
                                                    }-${item.name
                                                        .split(" ")
                                                        .join("_")}`}
                                                    key={index}
                                                    className="flex flex-col items-center gap-2 md:gap-5"
                                                >
                                                    <img
                                                        width={500}
                                                        height={281}
                                                        className="object-cover object-center w-full rounded-lg bg-zinc-600"
                                                        src={
                                                            item.backdrop_path
                                                                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                                                : defaultConst.wideImgPlaceholder
                                                        }
                                                        alt=""
                                                    />
                                                    <h1 className="text-base md:text-lg px-5 text-neutral-200 text-center">
                                                        {item.name}
                                                    </h1>
                                                </Link>
                                            );
                                        })}

                                        {/* COllection Skeleton */}
                                        {collection.isPending &&
                                            !colllectionRef.isDone && (
                                                <CollectionSkeleton />
                                            )}
                                    </div>
                                ) : (
                                    <div className="w-full h-[70vh] flex justify-center items-center">
                                        <h1 className="text-lg sm:text-2xl md:text-5xl text-neutral-400">
                                            No matching collection found:{" "}
                                            {query}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Keywords */}
                        {activeTab === "keyword" && (
                            <div className="w-full">
                                {keyword.data.length > 0 ? (
                                    <div className="w-full flex flex-col gap-2 md:gap-5 py-5 md:py-10">
                                        {keyword?.data?.map((item, index) => {
                                            if (
                                                keyword.data.length - 1 ===
                                                index
                                            ) {
                                                return (
                                                    <Link
                                                        ref={
                                                            keywordRef.lastItemRef
                                                        }
                                                        to={`/keyword/${
                                                            item.id
                                                        }-${item.name
                                                            .split(" ")
                                                            .join("_")}`}
                                                        key={index}
                                                        className=""
                                                    >
                                                        <h1 className="text-3xl md:text-6xl font-semibold capitalize text-neutral-300 hover:tracking-wide transition-all">
                                                            {item.name}
                                                        </h1>
                                                    </Link>
                                                );
                                            }
                                            return (
                                                <Link
                                                    to={`/keyword/${
                                                        item.id
                                                    }-${item.name
                                                        .split(" ")
                                                        .join("_")}`}
                                                    key={index}
                                                    className=""
                                                >
                                                    <h1 className="text-3xl md:text-6xl font-semibold capitalize text-neutral-300 hover:tracking-wide transition-all">
                                                        {item.name}
                                                    </h1>
                                                </Link>
                                            );
                                        })}

                                        {/* Skeleton Keywords */}
                                        {keyword.isPending &&
                                            !keywordRef.isDone &&
                                            Array.from({ length: 8 }).map(
                                                (_, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full md:w-1/2 h-8 md:h-14 rounded bg-zinc-600 animate-pulse"
                                                    ></div>
                                                )
                                            )}
                                    </div>
                                ) : (
                                    <div className="w-full h-[70vh] flex px-5 justify-center items-center">
                                        <h1 className="text-lg sm:text-2xl md:text-5xl text-neutral-400">
                                            No matching keyword found: {query}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

export default SearchPage;
