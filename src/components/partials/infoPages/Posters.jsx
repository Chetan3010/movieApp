import React, { useState } from "react";
import Download from "../global/Download";
import { motion } from "framer-motion";

const Posters = ({ title, posters }) => {
    const [posterPage, setPosterPage] = useState(16);

    const loadMorePosters = () => {
        setPosterPage((prev) => prev + 20);
    };

    return (
        <>
            {posters?.slice(0, posterPage).map((item, index) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={index}
                    className="rounded-xl overflow-hidden relative shadow-md shadow-neutral-900"
                >
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        width={500}
                        height={750}
                        className="object-cover w-full h-full object-center bg-zinc-600"
                        src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                        alt=""
                    />
                    {item.file_path && (
                        <Download title={title} file_path={item.file_path} />
                    )}
                </motion.div>
            ))}
            {posters?.length > posterPage && (
                <motion.button
                    whileHover={{ backgroundColor: "#c147e9" }}
                    onClick={loadMorePosters}
                    className="text-center col-span-full cursor-pointer my-5 bg-white text-black px-3 py-1 rounded-md"
                >
                    View more
                </motion.button>
            )}
        </>
    );
};

export default Posters;
