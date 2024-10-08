import { motion } from "framer-motion";
import React from "react";

const SkeletonRcmd = () => {

    return Array.from({ length: 20 }).map((_, index) => (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            key={index}
            className="flex flex-col gap-3 justify-start rounded-md "
        >
            <div className="object-cover object-center bg-zinc-600 animate-pulse rounded-xl pb-[56.2%]"></div>
            <div className="h-5 rounded-md bg-zinc-600 animate-pulse"></div>
        </motion.div>
    ));
};

export default SkeletonRcmd;
