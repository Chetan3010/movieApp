import React from "react";

const CardSkeleton = () => {
    return (
        <div className="rounded-xl overflow-hidden relative animate-pulse">
            {/* Skeleton Image */}
            <div className="relative bg-gray-500 w-full pb-[150%] rounded-xl">
                {/* Skeleton Gauge */}
                <div className="absolute top-full right-5 -translate-y-[50%] bg-zinc-950 rounded-full p-1">
                    <div className="w-[36px] h-[36px] md:w-[45px] md:h-[45px] bg-gray-400 rounded-full"></div>
                    <div className="absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%] bg-gray-500 h-4 w-4 rounded-full"></div>
                </div>
            </div>
            {/* Skeleton Content */}
            <div className="pt-6">
                <div className="h-4 md:h-6 lg:h-7 w-full bg-gray-500 rounded mb-2"></div>
                <div className="h-3 md:h-5 lg:h-6 w-full bg-gray-500 rounded"></div>
            </div>
        </div>
    );
};

export default CardSkeleton;
