import React from "react";
import { Link } from "react-router-dom";

const Collection = ({ backdrop_path, name}) => {
    return (
        <div className="bg-neutral-300 p-1 w-full md:w-[36rem] mt-5 rounded-xl group">
            <Link>
                <div className="flex">
                    <div className="relative w-[45%] md:w-80 rounded-xl overflow-hidden">
                        <div className="absolute w-full md:w-80 top-0 left-0 bottom-0 z-[1] bg-gradient-to-l from-neutral-300 "></div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                            alt=""
                            className="object-cover h-32 md:h-44 group-hover:contrast-150"
                        />
                    </div>
                    <div className="flex p-2 flex-col text-neutral-800 justify-center items-start gap-2">
                        <p className="text-lg md:text-xl font-semibold">
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
