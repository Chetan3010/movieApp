import React from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { getEndOfScrollPhrase } from "../../utils/helper";

const Cards = ({
    items,
    isPending,
    count = 10,
    error = false,
    isInfiniteScroll = false,
    lastItemRef = null,
    isDone = false,
}) => {
    const skeletonCards = Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
    ));

    return (
        <>
            {items.length > 0 ? (
                <>
                    {items.map((item, index) => {
                        if (isInfiniteScroll && index === items.length - 1) {
                            return (
                                <Card ref={lastItemRef} {...item} key={index} />
                            );
                        }
                        return <Card {...item} key={index} />;
                    })}
                    {isInfiniteScroll && isPending && !isDone && skeletonCards}
                    {isInfiniteScroll && (
                        <h1 className="italic text-sm text-gray-300 text-center col-span-full my-5">
                            {error || (!navigator.onLine && "No internet!")}
                        </h1>
                    )}
                    {isDone && (
                        <h1 className="italic text-sm text-gray-300 text-center col-span-full my-5">
                            {getEndOfScrollPhrase()}
                        </h1>
                    )}
                </>
            ) : (
                <>{skeletonCards}</>
            )}
        </>
    );
};

export default Cards;
