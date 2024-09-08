import React, { useState } from "react";
import { defaultConst } from "../../../utils/constants";
import { Link } from "react-router-dom";

const Cast = ({ cast }) => {

    const [castPage, setCastPage] = useState(21);

    const loadMoreCast = () => {
        setCastPage((prev) => prev + 21);
    };
    
    return (
        <>
            {cast?.slice(0, castPage).map((item, index) => (
                <Link to={`/person/${item.id}-${item?.name.split(" ").join("_")}`} key={index} className="flex flex-col items-center">
                    <img
                        className="object-top object-cover rounded-xl w-44 h-56 bg-zinc-600"
                        src={
                            item.profile_path
                                ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                : defaultConst.imgPlaceholder
                        }
                        alt=""
                    />
                    <h3 className="text-lg mt-2 text-center">
                        {item.character || item?.role && item?.roles[0].character}
                    </h3>
                    <h3 className="text-lg text-center font-light text-gray-300">
                        {item.name || item.original_name}
                    </h3>
                    {item.roles && (
                        <h3 className="text-base text-center font-light text-neutral-500">
                            {item.roles[0].episode_count} Episodes
                        </h3>
                    )}
                </Link>
            ))}

            {cast?.length > castPage && (
                <button
                    onClick={loadMoreCast}
                    className="text-center col-span-full cursor-pointer my-5 purple-white w-b px-3 py-1 rounded-md"
                >
                    View more
                </button>
            )}
        </>
    );
};

export default Cast;
