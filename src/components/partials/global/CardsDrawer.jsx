import { useState } from "react";
import SelectionTab from "../global/SelectionTab";
import Cards from "../global/Cards";
import { AnimatePresence } from "framer-motion";

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
    const route = cardData[selectedType].route;
    const ref = cardData[selectedType].lastItemRef ?? null;
    const isDone = cardData[selectedType].isDone ?? false;

    return (
        <>
            <div className="w-full mt-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-5">
                    {title}
                </h1>
                <SelectionTab
                    lsKey={lsKey}
                    options={options}
                    selectedOption={selectedType}
                    onSelect={(option) => setSelectedType(option)}
                />
            </div>
            <AnimatePresence mode="wait">
                <div className="cardDrawer">
                    <Cards
                        items={items}
                        isPending={isPending}
                        isInfiniteScroll={isInfiniteScroll}
                        lastItemRef={ref}
                        error={error}
                        isDone={isDone}
                        route={route}
                    />
                </div>
            </AnimatePresence>
        </>
    );
};

export default CardsDrawer;
