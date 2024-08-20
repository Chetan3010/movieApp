import React, { useContext, useState } from "react";
import Topnav from "../Layout/Topnav";
import { Link } from "react-router-dom";
import Button from "../partials/Button";
import Genres from "../partials/Genres";
import { MovieGenreContext, TvGenreContext } from "../../Contexts/Contexts";
import useRegion from "../../hooks/useRegion";
import { apiEndpoints } from "../../utils/constants";
import useFetch from "../../hooks/useFetch";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import SelectionTab from "../partials/SelectionTab";
import Cards from "../partials/Cards";
import CardsDrawer from "../Layout/CardsDrawer";

const Explore = () => {
    const { data: movieGenres } = useContext(MovieGenreContext);
    const { data: tvGenres } = useContext(TvGenreContext);

    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const { region, timezone } = useRegion();

    const movies = useFetch(apiEndpoints.movie.upcoming({ page: moviePage, region }));
    const tv = useFetch(apiEndpoints.tv.onTheAir({ page: tvPage, timezone }));

    const movieRef =
        useInfiniteScroll({
            isPending: movies.isPending,
            page: moviePage,
            setPage: setMoviePage,
            totalPages: movies.totalPages,
        });

    const tvRef = useInfiniteScroll({
        isPending: tv.isPending,
        page: tvPage,
        setPage: setTvPage,
        totalPages: tv.totalPages,
    });

    const options = [
        { name: "Movies", value: "movie" },
        { name: "Tv Shows", value: "tv" },
    ];

    const cardData = {
        movie: {
            ...movies,
            ...movieRef,
            title: "Upcoming Movies"
        },
        tv: {
            ...tv,
            ...tvRef,
            title: "On The Air Tv shows"
        }
    }

    return (
        <section className="main box-border">
            <Topnav />
            <div className="px-5 md:px-12">
                <div className="w-full flex flex-col md:flex-row mt-5 border border-zinc-700 rounded-lg overflow-hidden">
                    <div className="explore w-full md:w-[70%] overflow-hidden relative">
                        <img
                            className="w-full h-48 md:h-full object-center object-cover hover:scale-110 transition-all duration-300 ease-in-out"
                            src="/watch-providers.webp"
                            alt="watch-provider banner"
                        />
                    </div>
                    <div className="w-full md:w-[30%] p-4 md:p-8 flex flex-col justify-center">
                        <p className="font-light pb-4">
                            Explore the best streaming services all in one
                            place. From popular movies to trending TV shows,
                            find out where you can watch your favorite content
                            across various OTT platforms. Click the button below
                            to see the full list of providers and start enjoying
                            endless entertainment tailored to your preferences.
                        </p>
                        <Link to={"/watch-provider"}>
                            <Button title={"Watch Providers"} />
                        </Link>
                    </div>
                </div>
                <div className="mt-5 sm:mt-8 mb-10">
                    <Genres genres={movieGenres} title={"Movie Genres"} />
                    <Genres genres={tvGenres} title={"TV Genres"} />
                </div>
            </div>
            <CardsDrawer
                options={options}
                cardData={cardData}
                lsKey={"exploreTab"}
                isInfiniteScroll={true}
            />
        </section>
    );
};

export default Explore;
