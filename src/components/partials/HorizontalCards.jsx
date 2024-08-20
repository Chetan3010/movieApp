import React from "react";
import DropdownMenu from "./DropdownMenu";

const HorizontalCards = ({ title, items, filter = false }) => {

    const handleSelect = (option) => {
        console.log("Selected:", option);
    };

    return (
        <div className="w-full px-2 mt-2">
            <div className="flex items-end justify-between px-2 md:px-10">
                <h1 className="text-xl">{title}</h1>
                {filter && (
                    <DropdownMenu
                        title="Filter"
                        options={filter}
                        onSelect={handleSelect}
                    />
                )}
            </div>
            <div className="w-full flex gap-2 md:gap-3 py-2 md:py-4 overflow-y-auto ">
                {items?.length > 0 ?
                    items.map(
                        (item, index) =>
                            item?.poster_path && (
                                <img
                                    loading="lazy"
                                    key={index}
                                    className={`${index===0 ? "md:ml-10" : index===items.length-1 ? "md:mr-10" : ""} w-[6.5rem] md:w-56 h-36 md:h-80 flex-shrink-0 object-center object-cover rounded-md overflow-hidden`}
                                    src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                                    alt={item.id}
                                />
                            )
                    )
                    : [0,0,0,0,0,0,0].map((_,index) => <div key={index} className={`${index===0 && "md:ml-10"} w-[6.5rem] md:w-56 h-36 md:h-80 flex-shrink-0 object-center object-cover rounded-md overflow-hidden bg-gray-600 animate-pulse`}></div>)
                    }
            </div>
        </div>
    );
};

export default HorizontalCards;
