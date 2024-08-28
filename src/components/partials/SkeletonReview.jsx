import React from "react";

const SkeletonReview = () => {
    return Array.from({ length: 5 }).map((_, index) => (
        <>
            <hr className="my-5 md:my-10 border-neutral-700" />
            <div className="my-5">
                <div className="flex gap-3 items-center w-full">
                    <div
                        className="w-10 h-10 rounded-full object-center bg-zinc-600 animate-pulse"
                        alt="userAvatar"
                    ></div>
                    <div className="flex flex-col justify-start gap-1">
                        <div className="h-5 bg-zinc-600 w-24 rounded animate-pulse"></div>
                        <div className="h-3 bg-zinc-600 w-24 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="mt-5 font-light text-neutral-300 whitespace-pre-wrap">
                    <div className="w-full bg-zinc-600 h-5 my-1 rounded-md animate-pulse"></div>
                    <div className="w-full bg-zinc-600 h-5 my-1 rounded-md animate-pulse"></div>
                </div>
            </div>
            {index === 5-1 && <hr className="my-10 border-neutral-700" />}
        </>
    ));
};

export default SkeletonReview;
