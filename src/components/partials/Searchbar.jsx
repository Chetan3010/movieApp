import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import loader from "/loader.svg";
import { apiEndpoints } from "../../utils/constants";
import useFetch from "../../hooks/useFetch";

const Searchbar = ({ toggleSearch, setToggleSearch, isDisable = false }) => {
    const [query, setQuery] = useState("");
    const debounceTimeout = useRef(null);
    const {
        data: searches,
        setData: setSearches,
        isPending: isLoading,
        totalPages: movieTotalPages,
    } = useFetch(apiEndpoints.search.multi({ query }));

    return (
        <div
            className={`h-fit w-full md:w-[70%] justify-center mt-2 ${
                isDisable ? "flex md:hidden" : "hidden md:flex"
            }`}
        >
            <div className="w-full md:w-[70%] relative bg-transparent border-[1px] border-zinc-600 px-4 flex items-center rounded mb-4 md:mb-0 md:rounded-full">
                <BsSearch className="cursor-pointer" />
                <form
                    className="w-full "
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <input
                        onChange={(e) => {
                            // setIsLoading(true);
                            setQuery(e.target.value);
                        }}
                        className="w-full bg-transparent outline-none px-3 py-3"
                        placeholder="What are you looking for?"
                        type="text"
                        value={query}
                        name="query"
                        autoComplete={"off"}
                    />
                </form>
                <RxCross1
                    className="cursor-pointer"
                    onClick={() => {
                        if (query) {
                            setQuery("");
                            setSearches([]);
                            return;
                        }
                        setToggleSearch(false);
                    }}
                />
                {query && (
                    <div className="absolute z-50 top-[100%] left-0 mt-2 w-full max-h-72 overflow-y-auto rounded-md text-zinc-200 bg-zinc-900 border border-zinc-700">
                        {isLoading ? (
                            <div className="w-full flex justify-center p-1">
                                <img
                                    className="w-4 h-4 md:w-8 md:h-8"
                                    src={loader}
                                    alt="loader"
                                />
                            </div>
                        ) : // <p className="font-thin italic">Searching...</p>
                        searches.length > 0 && query.length > 0 ? (
                            searches.map((item) => (
                                <Link
                                    key={item.id}
                                    className="flex items-center justify-between hover:bg-[#311747fd] hover:text-[#C147E9] p-2 border-b"
                                    to={""}
                                >
                                    <h4>
                                        {item.title || item.name}{" "}
                                        {item?.media_type === "person"
                                            ? ""
                                            : `(${
                                                  (item?.release_date &&
                                                      item.release_date.split(
                                                          "-"
                                                      )[0]) ||
                                                  (item?.first_air_date &&
                                                      item.first_air_date.split(
                                                          "-"
                                                      )[0])
                                              })`}
                                    </h4>
                                    <div className="border-zinc-200 00 border rounded py-1 px-2">
                                        {item?.media_type === "tv"
                                            ? "TV"
                                            : item?.media_type
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              item.media_type.slice(1)}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="font-thin italic">
                                No results found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Searchbar;
