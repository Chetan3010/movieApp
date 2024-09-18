import React, { useState } from "react";
import { defaultConst } from "../../../utils/constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cast = ({ cast }) => {
    const [castPage, setCastPage] = useState(21);

    const loadMoreCast = () => {
        setCastPage((prev) => prev + 21);
    };

    return (
        <>
            {cast?.slice(0, castPage).map((item, index) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    key={index}
                >
                    <Link
                        to={`/person/${item.id}-${item?.name
                            .split(" ")
                            .join("_")}`}
                        className="flex flex-col items-center"
                    >
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
                            {item.character ||
                                (item?.role && item?.roles[0].character)}
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
                </motion.div>
            ))}

            {cast?.length > castPage && (
                <motion.button
                    whileHover={{ backgroundColor: "#c147e9" }}
                    onClick={loadMoreCast}
                    className="text-center col-span-full cursor-pointer my-5 bg-white text-black px-3 py-1 rounded-md"
                >
                    View more
                </motion.button>
            )}
        </>
    );
};

export default Cast;
