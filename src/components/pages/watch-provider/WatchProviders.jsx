import React, { useState } from "react";
import Topnav from "../../partials/topnav/Topnav";
import useRegion from "../../../hooks/useRegion";
import SelectionTab from "../../partials/global/SelectionTab";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints } from "../../../utils/constants";
import { Link } from "react-router-dom";
import RegionDropdown from "../../partials/global/RegionDropdown";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";

const WatchProviders = () => {
    const { region } = useRegion();

    const [currentRegion, setCurrentRegion] = useState({});

    const { data: movie } = useFetch(
        apiEndpoints.watchProvider.movieWatchProvider({
            region: currentRegion?.iso_3166_1 ?? region,
        })
    );

    const { data: tv } = useFetch(
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
                <div className="px-5 md:px-12 flex flex-col justify-center items-center py-4 md:py-8">
                    <h1 className="text-2xl mb-5 sm:text-3xl md:text-4xl font-semibold">
                        Watch Providers available in{" "}
                        {currentRegion.english_name ??
                            regions.find((item) => {
                                if (item.iso_3166_1 === region) return item;
                            })?.english_name}
                    </h1>
                    <SelectionTab
                        lsKey={"wpTab"}
                        options={options}
                        onSelect={(option) => setSelectedOption(option)}
                        selectedOption={selectedOption}
                    />
                    <div className="mt-5 w-full flex flex-col md:flex-row gap-2 justify-end whitespace-nowrap">
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
                    <div className="my-8 gap-5 md:gap-10 w-full grid grid-cols-5 md:grid-cols-16">
                        {selectedOption === "movie" &&
                            movie
                                ?.filter((item) =>
                                    item.provider_name
                                        .toLowerCase()
                                        .includes(query.toLowerCase())
                                )
                                .map((item, index) => (
                                    <Link
                                        to={`${
                                            item.provider_id
                                        }-${item.provider_name
                                            .split(" ")
                                            .join("_")}/movie?region=${
                                            currentRegion.iso_3166_1 ?? region
                                        }`}
                                        key={index}
                                        className="w-16 h-16 bg-zinc-600 rounded-md overflow-hidden hover:scale-105 transition-all duration-150 ease-in"
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
                                ))}
                        {selectedOption === "tv" &&
                            tv
                                ?.filter((item) =>
                                    item.provider_name
                                        .toLowerCase()
                                        .includes(query)
                                )
                                .map((item, index) => (
                                    <Link
                                        to={`${
                                            item.provider_id
                                        }-${item.provider_name
                                            .split(" ")
                                            .join("_")}/tv?region=${
                                            currentRegion.iso_3166_1 ?? region
                                        }`}
                                        key={index}
                                        className="w-16 h-16 bg-zinc-600 rounded-md overflow-hidden hover:scale-105 transition-all duration-150 ease-in"
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
                                ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default WatchProviders;
