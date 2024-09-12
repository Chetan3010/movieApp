import React from "react";

const SkeletonPeopleCard = () => {
    const dummyArray = Array.from({ length: 8 });
    return dummyArray.map((_, index) => (
        <div key={index} className="rounded-xl overflow-hidden relative animate-pulse">
            {/* Skeleton Image */}
            <div className="relative animate-pulse bg-gray-500 w-full pb-[150%] rounded-xl">
            </div>
            {/* Skeleton Content */}
            <div className="pt-4 md:pt-6">
                <div className="h-4 animate-pulse md:h-6 lg:h-7 w-full bg-gray-500 rounded mb-2"></div>
                <div className="h-3 animate-pulse md:h-5 lg:h-6 w-full bg-gray-500 rounded"></div>
            </div>
        </div>
    ));
};

export default SkeletonPeopleCard;
