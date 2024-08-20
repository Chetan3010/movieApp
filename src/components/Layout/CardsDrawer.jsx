import { useState } from "react";
import SelectionTab from "../partials/SelectionTab";
import Cards from "../partials/Cards";

const CardsDrawer = ({
    options,
    cardData,
    lsKey,
    isInfiniteScroll = false,
}) => {
    const [selectedType, setSelectedType] = useState(options[0].value);

    const title = cardData[selectedType].title;
    const items = cardData[selectedType].data;
    const isPending = cardData[selectedType].isPending;
    const error = cardData[selectedType].error;
    const ref = cardData[selectedType].lastItemRef ?? null;
    const isDone = cardData[selectedType].isDone ?? false;

    return (
        <>
            <div className="w-full mt-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-2 mdLmb-5">
                    {title}
                </h1>
                <SelectionTab
                    lsKey={lsKey}
                    options={options}
                    selectedOption={selectedType}
                    onSelect={(option) => setSelectedType(option)}
                />
            </div>
            <div className="cardDrawer">
                <Cards
                    items={items}
                    isPending={isPending}
                    isInfiniteScroll={isInfiniteScroll}
                    lastItemRef={ref}
                    error={error}
                    isDone={isDone}
                />
            </div>
        </>
    );
};

export default CardsDrawer;
