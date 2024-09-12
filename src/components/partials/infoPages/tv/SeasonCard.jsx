import React from "react";
import { formatDate } from "../../../../utils/helper";
import { defaultConst } from "../../../../utils/constants";

const SeasonCard = ({ item }) => {
    const today = new Date();

    return (
        <>
            <div className="w-40 md:w-36 h-full">
                <img
                    className="object-center object-cover bg-neutral-500"
                    src={
                        item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : defaultConst.imgPlaceholder
                    }
                    alt=""
                    width={500}
                    height={750}
                />
            </div>
            <div className="bg-neutral-200 text-neutral-900 flex flex-col items-start justify-center w-full p-3 md:p-5">
                <h1 className="text-xl md:text-3xl leading-6 font-semibold">
                    {item.name}{" "}
                    {today < new Date(item.air_date) &&
                    today !== new Date(item.air_date)
                        ? " (Upcoming)"
                        : ""}
                </h1>
                <h1 className="flex gap-1 md:gap-2 items-center text-sm md:text-xl font-medium md:mt-1">
                    {item.air_date
                        ? formatDate({
                              date: item.air_date,
                              year: true,
                              month: true,
                              day: true,
                          })
                        : "NA"}
                    <i className="w-2 h-2 rounded-full bg-[#c147e9]"></i>
                    {item.episode_count} Episodes
                </h1>
                <p className="font-light leading-tight line-clamp-4 md:line-clamp-3 text-sm mt-1 md:mt-2">
                    {item.overview}
                </p>
            </div>
        </>
    );
};

export default SeasonCard;
