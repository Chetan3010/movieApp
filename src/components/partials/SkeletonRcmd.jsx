import React from "react";

const SkeletonRcmd = () => {
    return Array.from({ length: 20 }).map((_, index) => (
        <div
            key={index}
            className="flex flex-col gap-3 justify-start rounded-md "
        >
            <div className="object-cover object-center bg-zinc-600 animate-pulse rounded-xl pb-[56.2%]"></div>
            <div className="h-5 rounded-md bg-zinc-600 animate-pulse"></div>
        </div>
    ));
};

export default SkeletonRcmd;
