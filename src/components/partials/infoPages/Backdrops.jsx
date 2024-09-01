import React, { useState } from "react";
import Download from "../global/Download";

const Backdrops = ({ title, backdrops }) => {
    const [backdropPage, setBackdropPage] = useState(10);

    const loadMoreBackdrops = () => {
        setBackdropPage((prev) => prev + 10);
    };
    return (
        <>
            {backdrops?.slice(0, backdropPage).map((item, index) => (
                <div
                    key={index}
                    className="rounded-xl overflow-hidden relative shadow-md shadow-neutral-900"
                >
                    <img
                        width={1280}
                        height={720}
                        className="object-cover w-full h-full object-center bg-zinc-600"
                        src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                        alt=""
                    />
                    {item.file_path && (
                        <Download title={title} file_path={item.file_path} />
                    )}
                </div>
            ))}
            {backdrops?.length > backdropPage && (
                <button
                    onClick={loadMoreBackdrops}
                    className="text-center col-span-full cursor-pointer my-5 purple-white w-b px-3 py-1 rounded-md"
                >
                    View more
                </button>
            )}
        </>
    );
};

export default Backdrops;
