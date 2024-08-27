import React from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { getEndOfScrollPhrase } from "../../utils/helper";

const Cards = ({
    items,
    isPending,
    count = 10,
    error = false,
    route,
    isInfiniteScroll = false,
    lastItemRef = null,
    isDone = false,
}) => {
    const skeletonCards = Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
    ));

    const getOnlineStatus = () => !navigator.onLine && "No internet!"
    
    return (
        <>
            {items.length > 0 ? (
                <>
                    {items.map((item, index) => {
                        if (isInfiniteScroll && index === items.length - 1) {
                            return (
                                <Card ref={lastItemRef} {...item} route={route} key={index} />
                            );
                        }
                        return <Card {...item} route={route} key={index} />;
                    })}
                    {isInfiniteScroll && isPending && !isDone && skeletonCards}
                    {isInfiniteScroll && (error ?? getOnlineStatus()) && (
                        <h1 className="italic text-sm text-gray-300 text-center col-span-full my-5">
                            {error || getOnlineStatus()}
                        </h1>
                    )}
                    {isDone && (
                        <h1 className="italic text-sm text-gray-300 text-center col-span-full my-5">
                            {getEndOfScrollPhrase()}
                        </h1>
                    )}
                </>
            ) : skeletonCards}
        </>
    );
};

export default Cards;
