import { motion } from "framer-motion";
import React from "react";

const SearchDataSkeleton = () => {
    const dummyArray = Array.from({ length: 5 });
    return dummyArray.map((_, index) => (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            key={index}
            className="flex w-full h-40 md:h-44 rounded-xl overflow-hidden"
        >
            <div className="w-40 md:w-36 h-full">
                <div className="pb-[150%] bg-gray-600 animate-pulse"></div>
            </div>
            <div className="bg-neutral-200 text-neutral-900 flex flex-col items-start gap-2 justify-center w-full p-3 md:p-5">
                <div className="animate-pulse w-1/2 bg-zinc-400 h-10 rounded"></div>
                <div className="animate-pulse w-40 bg-zinc-400 h-6 rounded"></div>
                <div className="animate-pulse w-full bg-zinc-400 h-4 rounded"></div>
                <div className="animate-pulse w-full bg-zinc-400 h-4 rounded"></div>
                <div className="animate-pulse w-full bg-zinc-400 h-4 rounded"></div>
            </div>
        </motion.div>
    ));
};

export default SearchDataSkeleton;
