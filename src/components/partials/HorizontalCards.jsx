import React from "react";
import DropdownMenu from "./DropdownMenu";
import Card from "./Card";

const HorizontalCards = ({ title, items, filter = false }) => {
    return (
        <div className="w-full mt-2">
            <div className="flex items-end justify-between px-2 md:px-12">
                <h1 className="text-2xl md:text-4xl mb-4 font-semibold">{title}</h1>
                {filter && (
                    <DropdownMenu
                        title="Filter"
                        options={filter}
                        onSelect={handleSelect}
                    />
                )}
            </div>
            <div className="flex overflow-y-scroll gap-4 md:gap-10 px-2 md:px-12 hideScrollbar">
                {items.length > 0 &&
                    items.map((item, index) => {
                        return <div
                            key={index}
                            className="flex-shrink-0 w-32 md:w-52 relative"
                        >
                            <Card {...item} />
                        </div>;
                    })}
            </div>
        </div>
    );
};

export default HorizontalCards;
