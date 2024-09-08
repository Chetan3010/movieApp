import React from "react";
import CardSkeleton from "../../skeleton/CardSkeleton";
import { getEndOfScrollPhrase } from "../../../../utils/helper";
import PeopleCard from "./PeopleCard";
import SkeletonPeopleCard from "../../skeleton/SkeletonPeopleCard";

const PeopleCards = ({
    items,
    title = null,
    isPending,
    count = 5,
    error = false,
    isInfiniteScroll = false,
    lastItemRef = null,
    isDone = false,
}) => {

    const getOnlineStatus = () => !navigator.onLine && "No internet!";

    return (
        <>
            {title !== null && (
                <h1 className="text-center text-3xl md:text-5xl pt-2 md:pt-5">
                    {title}
                </h1>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-12 mt-4 md:mt-8 px-4 md:px-12">
                {items ? (
                    <>
                        {items.map((item, index) => {
                            if (
                                isInfiniteScroll &&
                                index === items.length - 1
                            ) {
                                return (
                                    <PeopleCard
                                        ref={lastItemRef}
                                        {...item}
                                        key={index}
                                    />
                                );
                            }
                            return <PeopleCard {...item} key={index} />;
                        })}
                        {isInfiniteScroll &&
                            isPending &&
                            !isDone &&
                            <SkeletonPeopleCard />}
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
                ) : (
                    <SkeletonPeopleCard />
                )}
            </div>
        </>
    );
};

export default PeopleCards;
