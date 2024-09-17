import { motion } from "framer-motion";
import React from "react";

const CollectionSkeleton = () => {
    const dummyArray = Array.from({ length: 8 });

    return dummyArray.map((_, index) => (
        <motion.div
            initial={{
                scale: 0.9,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            key={index}
            className="flex flex-col items-center gap-2 md:gap-5"
        >
            <div className="pb-[56.2%] w-full bg-zinc-600 rounded-lg animate-pulse"></div>
            <div className="w-full animate-pulse h-4 rounded bg-zinc-600"></div>
        </motion.div>
    ));
};

export default CollectionSkeleton;
