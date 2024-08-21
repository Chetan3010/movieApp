import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints } from "../../utils/constants";
import Topnav from "../Layout/Topnav";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import PeopleCards from "../partials/PeopleCards";
import { isPending } from "@reduxjs/toolkit";

const Peoples = () => {
    const [page, setPage] = useState(1);

    const { data, error, isPending, totalPages } = useFetch(
        apiEndpoints.people.pupular({ page })
    );
    const { lastItemRef, isDone } = useInfiniteScroll({
        isPending: isPending,
        page: page,
        setPage: setPage,
        totalPages: totalPages,
    });

    return (
        <section className="main">
            <Topnav />
            <div className="w-full">
                <PeopleCards
                    title={"Recent popular people's"}
                    items={data}
                    isPending={isPending}
                    isInfiniteScroll={true}
                    lastItemRef={lastItemRef}
                    isDone={isDone}
                />
            </div>
        </section>
    );
};

export default Peoples;
