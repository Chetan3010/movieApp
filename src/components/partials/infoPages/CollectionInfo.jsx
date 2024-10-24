import React from "react";
import { Link } from "react-router-dom";
import { defaultConst } from "../../../utils/constants";

const Collection = ({ backdrop_path, name, id }) => {
    return (
        <div className="bg-neutral-300 p-1 w-full sm:w-fit md:w-[36rem] mt-5 rounded-xl group">
            <Link to={`/collection/${id}-${name.replace(/\s+/g, "_")}`}>
                <div className="flex">
                    <div className="relative w-[45%] md:w-80 rounded-xl overflow-hidden">
                        <img
                            src={backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : defaultConst.wideImgPlaceholder}
                            alt={name}
                            className="object-cover h-32 md:h-44 group-hover:contrast-150"
                        />
                        <div className="absolute w-full md:w-80 top-0 left-0 bottom-0 bg-gradient-to-l from-neutral-300 to-transparent"></div>
                    </div>
                    <div className="flex p-2 flex-col text-neutral-800 justify-center items-start gap-2">
                        <p className="text-lg md:text-xl font-semibold whitespace-nowrap line-clamp-2">
                            Part of the <br />
                            {name}
                        </p>
                        <p className="bg-[#0F0617] px-3 py-1 rounded-full text-neutral-300 hover:text-[#c147e9]">
                            View Collection
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Collection;
