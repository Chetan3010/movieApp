import React, { useContext } from "react";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import Topnav from "../partials/topnav/Topnav";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../utils/constants";
import Loader from "../partials/global/Loader";
import { getRating } from "../../utils/helper";
import { MovieGenreContext } from "../../contexts/Contexts";
import Cards from "../partials/global/Cards";
import Posters from "../partials/infoPages/Posters";
import Backdrops from "../partials/infoPages/Backdrops";
import { AnimatePresence, motion } from "framer-motion";
import Error from "./Error";

const Collection = () => {
    const { id } = useParams();
    const collectionId = id.split("-")[0];

    const { data: info, isPending: infoIsPending, error } = useFetch(
        apiEndpoints.collection.collectionDetails({ id: collectionId })
    );
    const { data: images, isPending: imagesIsPending } = useFetch(
        apiEndpoints.collection.collectionImages({ id: collectionId })
    );

    const { data: movieGenres } = useContext(MovieGenreContext);

    const { name, overview, poster_path, backdrop_path, parts } = info;

    const { backdrops, posters } = images;

    const allGenres = Array.from(
        new Set(parts?.map((part) => part.genre_ids).flat())
    )
        .map((genreId) => movieGenres.find((genre) => genre.id === genreId))
        .splice(0, 5);

    const validRatedParts = parts?.filter(
        (part) => !Number.isNaN(part.vote_average) && part.vote_average > 0
    );

    const rating =
        validRatedParts?.length > 0
            ? getRating(
                  validRatedParts.reduce(
                      (acc, part) => acc + part.vote_average,
                      0
                  ) / validRatedParts.length
              )
            : null;

    const sortedParts = parts?.sort((a, b) =>
        a.release_date.localeCompare(b.release_date)
    );

    if(error){
        return <Error status={error.status} />
    }

    return (
        <>
            <ScrollRestorationCustom />
            <section className={`main`}>
                <Topnav />
                <AnimatePresence mode="wait">
                    {!infoIsPending && !imagesIsPending ? (
                        <motion.div
                            key={'collection'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full relative bg-[#0F0617] py-5"
                        >
                            <div className="grid md:grid-flow-col gap-6 md:gap-14 place-items-center md:place-items-start md:justify-start px-4 md:px-14">
                                <div className="flex flex-col gap-5 w-72">
                                    <img
                                        src={
                                            poster_path
                                                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                                : defaultConst.imgPlaceholder
                                        }
                                        width={500}
                                        height={750}
                                        className="object-cover object-center bg-zinc-600 h-auto rounded-xl"
                                    />
                                </div>
                                <div className="right">
                                    <h1 className="text-3xl md:text-4xl font-semibold md:font-bold">
                                        {name}
                                    </h1>

                                    {allGenres?.length > 0 ? (
                                        <>
                                            <div className="flex gap-2 items-center mt-2 md:mt-5">
                                                {allGenres.map(
                                                    (item, index) => (
                                                        <Link
                                                            to={`/genre/movies/${
                                                                item?.id
                                                            }-${item?.name
                                                                .split(" ")
                                                                .join("_")}`}
                                                            key={index}
                                                            className="md:border-2 border-neutral-400 underline underline-offset-2 whitespace-nowrap md:no-underline text-sm md:text-base lg:text-lg font-extralight md:font-medium rounded-full md:px-3 md:py-1 md:hover:bg-[#c147e9] md:hover:text-[#0f0617] md:hover:border-[#0f0617] transition-all ease-in duration-300 cursor-pointer"
                                                        >
                                                            {item?.name}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {overview && (
                                        <h3 className="overview mt-2 md:mt-5 italic text-base md:text-xl text-neutral-200 font-medium md:font-semibold">
                                            {overview}
                                        </h3>
                                    )}

                                    {rating ? (
                                        <div className="rating flex mt-5 items-end">
                                            <h1 className="text-7xl font-bold text-[#c147e9] leading-none">
                                                {rating}
                                            </h1>
                                            <h3 className="text-xl leading-9">
                                                / 10
                                            </h3>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {parts?.length > 0 ? (
                                        <h1 className="text-xl mt-5">
                                            Number of movies:{" "}
                                            <span className="text-[#c147e9]">
                                                {parts?.length}
                                            </span>
                                        </h1>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            {parts?.length > 0 ? (
                                <div>
                                    <h1 className="px-5 md:px-14 mt-5 md:mt-10 text-2xl md:text-3xl font-semibold">{`Movies (${parts?.length})`}</h1>
                                    <div className="px-4 md:px-14 mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-12">
                                        <Cards
                                            items={parts}
                                            isPending={false}
                                            route={"movie"}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            <div className="px-5 md:px-14">
                                {backdrops?.length > 0 ? (
                                    <div className="mt-5">
                                        <h1 className="mt-5 md:mt-10 text-2xl md:text-3xl font-semibold">{`Pictures (${backdrops?.length})`}</h1>
                                        <div className="grid py-5 grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
                                            <Backdrops
                                                title={name}
                                                backdrops={backdrops}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {posters?.length > 0 ? (
                                    <div className="">
                                        <h1 className="mt-5 md:mt-10 text-2xl md:text-3xl font-semibold">{`Posters (${images?.posters.length})`}</h1>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-5 justify-items-center">
                                            <Posters
                                                title={name}
                                                posters={posters}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={'loader'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-[80vh] flex justify-center items-center"
                        >
                            <Loader classname={"w-16 h-16"} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};

export default Collection;
