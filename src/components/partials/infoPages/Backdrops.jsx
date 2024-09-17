import React, { useState } from "react";
import Download from "../global/Download";
import { motion } from "framer-motion";

const Backdrops = ({ title, backdrops }) => {
    const [backdropPage, setBackdropPage] = useState(10);

    const loadMoreBackdrops = () => {
        setBackdropPage((prev) => prev + 10);
    };

    return (
        <>
            {backdrops?.slice(0, backdropPage).map((item, index) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={index}
                    className="rounded-xl overflow-hidden relative shadow-md shadow-neutral-900"
                >
                    <motion.img
                        whileHover={{scale:1.05}}
                        width={1280}
                        height={720}
                        className="object-cover w-full h-full object-center bg-zinc-600"
                        src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                        alt=""
                    />
                    {item.file_path && (
                        <Download title={title} file_path={item.file_path} />
                    )}
                </motion.div>
            ))}
            {backdrops?.length > backdropPage && (
                <motion.button
                    whileHover={{ backgroundColor: "#c147e9" }}
                    onClick={loadMoreBackdrops}
                    className="text-center col-span-full cursor-pointer my-5 bg-white text-black px-3 py-1 rounded-md"
                >
                    View more
                </motion.button>
            )}
        </>
    );
};

export default Backdrops;
