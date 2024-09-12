import React from "react";
import { formatDate } from "../../../utils/helper";
import { defaultConst } from "../../../utils/constants";

const SearchDataCard = ({ item }) => {

    const image = item.poster_path ?? null
    const title = item.title ?? item.name ?? item.original_title ?? item.original_name ?? "NA"
    const date = item.release_date ?? item.first_air_date ?? null
    const overview = item.overview ?? ''
    const today = new Date();

    return (
        <>
            <div className="w-40 md:w-36 h-full">
                <img
                    className="object-center object-cover w-full h-full bg-neutral-500"
                    src={
                        image
                            ? `https://image.tmdb.org/t/p/w500${image}`
                            : defaultConst.imgPlaceholder
                    }
                    alt=""
                    width={500}
                    height={750}
                />
            </div>
            <div className="bg-neutral-200 text-neutral-900 flex flex-col items-start justify-center w-full p-3 md:p-5">
                <h1 className="text-xl md:text-3xl leading-6 font-semibold">
                    {title}{" "}
                    {today < new Date(date) &&
                    today !== new Date(date)
                        ? " (Upcoming)"
                        : ""}
                </h1>
                <h1 className="flex gap-1 md:gap-2 items-center text-neutral-700 text-sm md:text-xl font-medium md:mt-1">
                    {date
                        ? formatDate({
                              date: date,
                              year: true,
                              month: true,
                              day: true,
                          })
                        : "TBA"}
                </h1>
                <p className="font-light leading-tight line-clamp-3 text-sm mt-1 md:mt-2">
                    {overview}
                </p>
            </div>
        </>
    );
};

export default SearchDataCard;
