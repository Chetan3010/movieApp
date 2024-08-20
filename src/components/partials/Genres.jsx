import React from "react";
import { Link } from "react-router-dom";

const Genres = ({ genres, title }) => {
    const skeletonGenre = Array.from({ length: 6 }).map((_, i) => (
        <div
            key={i}
            className="w-36 h-20 md:w-56 md:h-28 px-5 flex-shrink-0 rounded-lg bg-zinc-600 animate-pulse"
        ></div>
    ));
    return (
        <div className="my-5">
            <h1 className="text-3xl py-4">{title}</h1>
            <div className="flex gap-5 items-center overflow-y-auto hideScrollbar ">
                {genres.length > 0
                    ? genres.map((genre, i) => (
                          <Link
                              to={""}
                              key={i}
                              className="w-36 h-20 md:w-56 md:h-28 px-5 flex-shrink-0 rounded-lg flex justify-center items-center text-xl md:text-2xl text-center secondary font-semibold text-wrap linearG"
                          >
                              {genre.name}
                          </Link>
                      ))
                    : skeletonGenre}
            </div>
        </div>
    );
};

export default Genres;
