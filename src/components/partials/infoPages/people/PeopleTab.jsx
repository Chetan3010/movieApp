import React, { useState } from "react";
import SelectionTab from "../../global/SelectionTab";
import { Gauge } from "@suyalcinkaya/gauge";
import { getRating } from "../../../../utils/helper";
import { Link } from "react-router-dom";
import { defaultConst } from "../../../../utils/constants";
import { AnimatePresence, motion } from "framer-motion";

const PeopleTab = ({ movieCredits, tvCredits }) => {
    const moviesUnique = movieCredits.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    const tvUnique = tvCredits.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    const options = [
        { name: "Movies", value: "movie" },
        { name: "Tv Shows", value: "tv" },
    ];

    const [selectedType, setSelectedType] = useState(options[0].value);

    const getColor = (rating) => {
        if (rating > 7) return "#22C55E";
        if (rating >= 3) return "#FFFF00";
        return "#FF0000";
    };

    return (
        <div className="w-full">
            <div className="w-full flex justify-center mt-20">
                <SelectionTab
                    lsKey={"personTab"}
                    selectedOption={selectedType}
                    onSelect={(option) => setSelectedType(option)}
                    options={options}
                />
            </div>
            <AnimatePresence mode="wait">
                {selectedType === "movie" && (
                    <motion.div
                        key={"movie"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cardDrawer"
                    >
                        {moviesUnique.length > 0 ? (
                            moviesUnique.map((item, index) => {
                                const rating = getRating(item.vote_average);
                                return (
                                    <motion.div key={index} whileHover={{scale:1.05}}>
                                        <Link
                                            
                                            to={`/movie/${item.id}-${item.title
                                                .split(" ")
                                                .join("_")}`}
                                        >
                                            <div className="rounded-xl overflow-hidden relative">
                                                <div className="relative">
                                                    <img
                                                        className="object-cover w-full h-full rounded-xl bg-zinc-600"
                                                        src={
                                                            item.poster_path
                                                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                                : defaultConst.imgPlaceholder
                                                        }
                                                        width={500}
                                                        height={750}
                                                        alt={item.title}
                                                    />
                                                    <div className="absolute top-full right-5 -translate-y-[50%] bg-zinc-950 rounded-full p-1">
                                                        <Gauge
                                                            className="w-[36px] h-[36px] md:w-[45px] md:h-[45px]"
                                                            value={
                                                                rating !== "NR"
                                                                    ? rating *
                                                                      10
                                                                    : 0
                                                            }
                                                            gapPercent={5}
                                                            strokeWidth={5}
                                                            primary={getColor(
                                                                rating
                                                            )}
                                                            secondary={
                                                                "#4b5563"
                                                            }
                                                        />
                                                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[12px] md:text-sm">
                                                            {rating}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="pt-6">
                                                    <h3 className="text-[16px] md:text-xl line-clamp-2">
                                                        {item.title ||
                                                            item.original_title}
                                                    </h3>
                                                    <h6 className="font-extralight text-sm md:text-base">
                                                        {item.release_date
                                                            ? new Date(
                                                                  item.release_date
                                                              ).toLocaleDateString(
                                                                  "en-US",
                                                                  {
                                                                      year: "numeric",
                                                                      month: "short",
                                                                      day: "numeric",
                                                                  }
                                                              )
                                                            : "TBA"}
                                                    </h6>
                                                    <p className="text-sm md:text-base font-extralight text-neutral-400">
                                                        {item.department}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <p className="col-span-full text-center italic text-xl text-neutral-400">
                                No movies.
                            </p>
                        )}
                    </motion.div>
                )}

                {selectedType === "tv" && (
                    <motion.div
                        key={"tv"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cardDrawer"
                    >
                        {tvUnique.length > 0 ? (
                            tvUnique.map((item, index) => {
                                const rating = getRating(item.vote_average);
                                return (
                                    <motion.div key={index} whileHover={{scale:1.05}}>
                                        <Link
                                        to={`/tv/${item.id}-${item?.name
                                            .split(" ")
                                            .join("_")}`}
                                    >
                                        <div className="rounded-xl overflow-hidden relative">
                                            <div className="relative">
                                                <img
                                                    className="object-cover w-full h-full rounded-xl bg-zinc-600"
                                                    src={
                                                        item.poster_path
                                                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                            : defaultConst.imgPlaceholder
                                                    }
                                                    width={500}
                                                    height={750}
                                                    alt={item.name}
                                                />
                                                <div className="absolute top-full right-5 -translate-y-[50%] bg-zinc-950 rounded-full p-1">
                                                    <Gauge
                                                        className="w-[36px] h-[36px] md:w-[45px] md:h-[45px]"
                                                        value={
                                                            rating !== "NR"
                                                                ? rating * 10
                                                                : 0
                                                        }
                                                        gapPercent={5}
                                                        strokeWidth={5}
                                                        primary={getColor(
                                                            rating
                                                        )}
                                                        secondary={"#4b5563"}
                                                    />
                                                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[12px] md:text-sm">
                                                        {rating}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pt-6">
                                                <h3 className="text-[16px] md:text-xl line-clamp-2">
                                                    {item.name ||
                                                        item.original_name}
                                                </h3>
                                                <h6 className="font-extralight text-sm md:text-base">
                                                    {item.first_air_date
                                                        ? new Date(
                                                              item.first_air_date
                                                          ).toLocaleDateString(
                                                              "en-US",
                                                              {
                                                                  year: "numeric",
                                                                  month: "short",
                                                                  day: "numeric",
                                                              }
                                                          )
                                                        : "TBA"}
                                                </h6>
                                                <p className="text-sm md:text-base font-extralight text-neutral-400">
                                                    {item.department}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <p className="col-span-full text-center italic text-xl text-neutral-400">
                                No TV Shows.
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PeopleTab;
