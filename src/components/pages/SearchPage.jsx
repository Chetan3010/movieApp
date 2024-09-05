import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import Topnav from "../partials/topnav/Topnav";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../utils/constants";
import SearchDataCard from "../partials/global/SearchDataCard";
import PeopleCards from "../partials/infoPages/people/PeopleCards";
import PeopleCard from "../partials/infoPages/people/PeopleCard";

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

    useEffect(() => {
        movie.setData([]);
        tvshow.setData([]);
        person.setData([]);
        collection.setData([]);
        keyword.setData([]);
    }, [query]);

    return (
        <>
            <ScrollRestorationCustom />
            <section className={`main`}>
                <Topnav />
                <div className="px-5 md:px-14 py-5">
                    <div className="w-full flex justify-center">
                        <div className="mt-5 md:w-[85%] overflow-y-scroll hideScrollbar border-b border-neutral-500 flex">
                            {tabOptions.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveTab(item.key)}
                                    style={{
                                        transform:
                                            "cubic-bezier(0, 0.55, 0.45, 1)",
                                    }}
                                    className={`relative flex-shrink-0 w-60 md:w-1/5 overflow-hidden py-2 ${
                                        activeTab === item.key
                                            ? "bg-[#c147e9] text-white"
                                            : "text-neutral-300 bg-transparent"
                                    } text-xl font-semibold flex justify-center transition duration-300 items-center cursor-pointer rounded-t-lg`}
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
                                    {movie.data.map((item, index) => (
                                        <Link
                                            to={`/movie/${item.id}-${item.title.split(" ").join("_")}`}
                                            key={index}
                                            className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
                                        >
                                            <SearchDataCard item={item} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}

                    {/* Tv Shows */}
                    {activeTab === "tv" && (
                        <div className="w-full">
                            {tvshow?.data?.length > 0 ? (
                                <div className="w-full flex flex-col gap-5 items-center py-5 md:py-10">
                                    {tvshow.data.map((item, index) => (
                                        <Link
                                            to={`/tv/${item.id}-${item.name.split(" ").join("_")}`}
                                            key={index}
                                            className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
                                        >
                                            <SearchDataCard item={item} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}

                    {/* Persons */}
                    {activeTab === "person" && (
                        <div className="w-full">
                            {person?.data?.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-12 mt-4 md:mt-8 px-4 md:px-12">
                                    {person.data.map((item, index) => (
                                        <PeopleCard {...item} key={index} />
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}

                    {/* Collections */}
                    {activeTab === "collection" && (
                        <div className="w-full py-5 md:py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
                            {collection?.data?.map((item, index) => (
                                <Link
                                    to={`/collection/${item.id}-${item.name.split(" ").join("_")}`}
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
                            ))}
                        </div>
                    )}

                    {/* Keywords */}
                    {activeTab === "keyword" && (
                        <div className="w-full flex flex-col gap-2 md:gap-5 py-5 md:py-10">
                            {keyword?.data?.map((item, index) => (
                                <Link to={`/keyword/${item.id}-${item.name.split(" ").join("_")}`} key={index} className="">
                                    <h1 className="text-3xl md:text-6xl font-semibold capitalize text-neutral-300 hover:tracking-wide transition-all">{item.name}</h1>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default SearchPage;
