import { Gauge } from "@suyalcinkaya/gauge";
import React, { forwardRef } from "react";
import { defaultConst } from "../../utils/constants";
import { getGenreNames } from "../../utils/helper";

const Card = forwardRef(
    (
        {
            original_title,
            original_name,
            release_date,
            first_air_date,
            vote_average,
            poster_path,
            title, 
            name,
        },
        ref
    ) => {
        const rating = vote_average
            ? vote_average % 1 === 0
                ? vote_average.toFixed(0)
                : vote_average.toFixed(1)
            : "NR";

        const getColor = (rating) => {
            if (rating > 7) return "#22C55E";
            if (rating >= 3) return "#FFFF00";
            return "#FF0000";
        };

        return (
            <div className="rounded-xl overflow-hidden relative" ref={ref}>
                <div className="relative">
                    <img
                        className="object-cover w-full h-auto rounded-xl bg-zinc-600"
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                : defaultConst.imgPlaceholder
                        }
                        width={500}
                        height={750}
                        alt={original_title || original_name}
                    />
                    <div className="absolute top-full right-5 -translate-y-[50%] bg-zinc-950 rounded-full p-1">
                        <Gauge
                            className="w-[36px] h-[36px] md:w-[45px] md:h-[45px]"
                            value={rating !== "NR" ? rating * 10 : 0}
                            gapPercent={5}
                            strokeWidth={5}
                            primary={getColor(rating)}
                            secondary={"#4b5563"}
                        />
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[12px] md:text-sm">
                            {rating}
                        </p>
                    </div>
                </div>
                <div className="pt-6">
                    <h3 className="text-[16px] md:text-xl">
                        {title || name || original_title || original_name}
                    </h3>
                    <h6 className="font-extralight text-sm md:text-base">
                        {new Date(
                            release_date || first_air_date
                        ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </h6>
                </div>
            </div>
        );
    }
);

export default Card;
