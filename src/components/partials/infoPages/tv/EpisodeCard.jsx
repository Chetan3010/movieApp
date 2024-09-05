import React from "react";
import { defaultConst } from "../../../../utils/constants";
import { formatRuntime } from "../../../../utils/helper";

const EpisodeCard = ({ item, index }) => {
    return (
        <>
            <div className="w-full relative md:w-72 md:min-w-72 rounded-lg md:rounded-xl overflow-hidden">
                <img
                    className="object-cover object-center bg-zinc-600 rounded-lg md:rounded-xl"
                    width={1280}
                    height={720}
                    src={
                        item.still_path
                            ? `https://image.tmdb.org/t/p/w1280${item.still_path}`
                            : defaultConst.wideImgPlaceholder
                    }
                />
                <div className="absolute md:hidden bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-90"></div>
                <div className="absolute md:hidden left-2 bottom-2 flex gap-2 mt-1 md:mt-2 text-sm md:text-lg">
                    <h3 className="font-medium md:font-semibold text-neutral-200 flex items-center gap-2">
                        {`S${item.season_number} E${item.episode_number}`}
                    </h3>
                    <h3 className="font-medium md:font-semibold text-neutral-200 flex items-center gap-2">
                        <i className="w-2 h-2 bg-[#c147e9] rounded-full block"></i>
                        {new Date(item.air_date).toLocaleDateString("en-DE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </h3>
                    <h3 className="font-medium md:font-semibold text-neutral-200 flex items-center gap-2">
                        <i className="w-2 h-2 bg-[#c147e9] rounded-full block"></i>
                        {formatRuntime(item.runtime)}
                    </h3>
                </div>
            </div>
            <div>
                <h1 className="text-lg md:text-3xl font-medium md:font-semibold">
                    {`${index + 1}. ${item.name}`}
                </h1>
                <div className="hidden md:flex gap-2 mt-1 md:mt-2 text-sm md:text-lg">
                    <h3 className="font-medium md:font-semibold text-neutral-200 flex items-center gap-2">
                        {`S${item.season_number} E${item.episode_number}`}
                    </h3>
                    <h3 className="font-medium md:font-semibold text-neutral-200 flex items-center gap-2">
                        <i className="w-2 h-2 bg-[#c147e9] rounded-full block"></i>
                        {new Date(item.air_date).toLocaleDateString("en-DE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </h3>
                    <h3 className="font-medium md:font-semibold text-neutral-200 flex items-center gap-2">
                        <i className="w-2 h-2 bg-[#c147e9] rounded-full block"></i>
                        {formatRuntime(item.runtime)}
                    </h3>
                </div>
                <p className="mt-1 md:mt-2 text-neutral-400 line-clamp-3">
                    {item.overview}
                </p>
            </div>
        </>
    );
};

export default EpisodeCard;
