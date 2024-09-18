import React, { useState } from "react";
import Topnav from "../../partials/topnav/Topnav";
import useRegion from "../../../hooks/useRegion";
import SelectionTab from "../../partials/global/SelectionTab";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints } from "../../../utils/constants";
import { Link } from "react-router-dom";
import RegionDropdown from "../../partials/global/RegionDropdown";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../partials/global/Loader";

const WatchProviders = () => {
    const { region } = useRegion();

    const [currentRegion, setCurrentRegion] = useState({});

    const { data: movie, isPending: movieIsPending } = useFetch(
        apiEndpoints.watchProvider.movieWatchProvider({
            region: currentRegion?.iso_3166_1 ?? region,
        })
    );

    const { data: tv, isPending: tvIsPending } = useFetch(
        apiEndpoints.watchProvider.tvWatchProvider({
            region: currentRegion?.iso_3166_1 ?? region,
        })
    );

    const { data: regions } = useFetch(apiEndpoints.watchProvider.regions);

    const [query, setQuery] = useState("");

    const options = [
        { name: "Movies", value: "movie" },
        { name: "Tv Shows", value: "tv" },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0].value);

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-5 md:px-12 flex flex-col justify-center items-center py-4 md:py-8"
                >
                    <h1 className="text-3xl mb-8 sm:text-3xl md:text-4xl text-center text-neutral-400 font-semibold">
                        Watch Providers available in{" "}
                        <span className="text-neutral-200 capitalize">
                            {currentRegion.english_name ??
                                regions.find((item) => {
                                    if (item.iso_3166_1 === region) return item;
                                })?.english_name}
                        </span>
                    </h1>
                    <SelectionTab
                        lsKey={"wpTab"}
                        options={options}
                        onSelect={(option) => setSelectedOption(option)}
                        selectedOption={selectedOption}
                    />
                    <div className="mt-8 w-full flex flex-col md:flex-row gap-2 justify-end whitespace-nowrap">
                        <input
                            type="text"
                            className="w-full md:w-80 bg-zinc-500 text-neutral-300 font-medium outline-none px-4 py-2 rounded-md text-lg"
                            placeholder="Search watch providers"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="w-full md:w-80">
                            <RegionDropdown
                                defaultOption={
                                    regions?.find(
                                        (item) => item.iso_3166_1 === region
                                    ) ?? { iso_3166_1: region }
                                }
                                onSelect={(option) => setCurrentRegion(option)}
                                options={regions}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedOption === "movie" &&
                            (movieIsPending ? (
                                <motion.div
                                    key={"loader"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full pt-[50%] flex justify-center items-center"
                                >
                                    <Loader classname={"w-14 h-14"} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={"movie"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="my-8 gap-5 md:gap-7 w-full grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-16 place-items-center"
                                >
                                    {movie?.length > 0 ? (
                                        movie
                                            ?.filter((item) =>
                                                item.provider_name
                                                    .toLowerCase()
                                                    .includes(
                                                        query.toLowerCase()
                                                    )
                                            )
                                            .map((item, index) => (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    key={index}
                                                    className="rounded-md overflow-hidden w-16 h-16 bg-zinc-600"
                                                >
                                                    <Link
                                                        to={`${
                                                            item.provider_id
                                                        }-${item.provider_name
                                                            .split(" ")
                                                            .join(
                                                                "_"
                                                            )}/movie?region=${
                                                            currentRegion.iso_3166_1 ??
                                                            region
                                                        }`}
                                                    >
                                                        <img
                                                            src={
                                                                item?.logo_path &&
                                                                `https://image.tmdb.org/t/p/original${item.logo_path}`
                                                            }
                                                            className="w-full h-full object-cover object-center"
                                                            alt=""
                                                        />
                                                    </Link>
                                                </motion.div>
                                            ))
                                    ) : (
                                        <p className="col-span-full text-neutral-400 text-xl italic">
                                            No Watch Providers found.
                                        </p>
                                    )}
                                </motion.div>
                            ))}

                        {selectedOption === "tv" &&
                            (tvIsPending ? (
                                <motion.div
                                    key={"loader"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full pt-[50%] flex justify-center items-center"
                                >
                                    <Loader classname={"w-14 h-14"} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={"tv"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="my-8 gap-5 md:gap-10 w-full grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-16"
                                >
                                    {tv?.length > 0 ? (
                                        tv
                                            ?.filter((item) =>
                                                item.provider_name
                                                    .toLowerCase()
                                                    .includes(
                                                        query.toLowerCase()
                                                    )
                                            )
                                            .map((item, index) => (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    key={index}
                                                    className="rounded-md overflow-hidden w-16 h-16 bg-zinc-600"
                                                >
                                                    <Link
                                                        to={`${
                                                            item.provider_id
                                                        }-${item.provider_name
                                                            .split(" ")
                                                            .join(
                                                                "_"
                                                            )}/tv?region=${
                                                            currentRegion.iso_3166_1 ??
                                                            region
                                                        }`}
                                                    >
                                                        <img
                                                            src={
                                                                item?.logo_path &&
                                                                `https://image.tmdb.org/t/p/original${item.logo_path}`
                                                            }
                                                            className="w-full h-full object-cover object-center"
                                                            alt=""
                                                        />
                                                    </Link>
                                                </motion.div>
                                            ))
                                    ) : (
                                        <p className="col-span-full text-neutral-400 text-xl italic">
                                            No Watch Providers found.
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </motion.div>
            </section>
        </>
    );
};

export default WatchProviders;
