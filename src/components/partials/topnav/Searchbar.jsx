import React, { useRef, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoints } from "../../../utils/constants";
import useFetch from "../../../hooks/useFetch";
import Loader from "../global/Loader";
import { formatDate } from "../../../utils/helper";
import { motion } from "framer-motion";

const Searchbar = ({ isHidden = false, setIsSidenavOpen = null }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query); // Debounced query state
    const [toggleSearch, setToggleSearch] = useState(false);
    const searchRef = useRef(null); // Create a ref for the search container
    const inputRef = useRef(null)
    const navigate = useNavigate();

    const {
        data: searches,
        setData: setSearches,
        isPending: isLoading,
    } = useFetch(apiEndpoints.search.multi({ query: debouncedQuery })); // Use debouncedQuery for API call

    // Debounce the query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                event.stopPropagation();
                setToggleSearch(false); // Close the search bar when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef, setToggleSearch]);

    return (
        <div
            className={`h-fit w-full md:w-[70%] justify-center mt-2 ${
                isHidden ? "flex md:hidden" : "hidden md:flex"
            }`}
        >
            <div
                ref={searchRef} // Attach the ref to the container
                className="w-full md:w-[70%] relative bg-transparent border-[1px] border-zinc-600 px-4 flex items-center rounded mb-4 md:mb-0 md:rounded-full"
            >
                <BsSearch className="cursor-pointer" />
                <form
                    className="w-full"
                    onSubmit={(e) => {
                        e.preventDefault();
                        inputRef.current.blur()
                        setToggleSearch(false);
                        if (setIsSidenavOpen !== null) {
                            setIsSidenavOpen(false);
                        }
                        navigate(`/search/${query}`);
                    }}
                >
                    <input
                        onChange={(e) => {
                            setQuery(e.target.value); // Update query
                            setToggleSearch(true);
                        }}
                        onClick={() => setToggleSearch(true)}
                        className="w-full bg-transparent outline-none px-3 py-3"
                        placeholder="What are you looking for?"
                        type="text"
                        value={query}
                        name="query"
                        autoComplete="off"
                        ref={inputRef}
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
                {(query || searches?.length > 0) && toggleSearch && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute z-50 top-[100%] left-0 mt-2 w-full max-h-72 overflow-y-auto rounded-md text-neutral-800 bg-neutral-200"
                    >
                        {isLoading ? (
                            <div className="w-full h-20 flex justify-center items-center p-1">
                                <Loader classname={"w-8 h-8"} />
                            </div>
                        ) : searches.length > 0 && debouncedQuery.length > 0 ? (
                            searches.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Link
                                        onClick={() => {
                                            setToggleSearch(false);
                                            if (setIsSidenavOpen !== null) {
                                                setIsSidenavOpen(false);
                                            }
                                        }}
                                        key={item.id}
                                        className="flex items-center justify-between p-2 border-b border-neutral-800 group hover:bg-neutral-300 transition-all"
                                        to={`/${item.media_type}/${item.id}-${(
                                            item.name || item.title
                                        )
                                            .split(" ")
                                            .join("_")}`}
                                    >
                                        <h4>
                                            {item.title || item.name}{" "}
                                            {item?.media_type === "person"
                                                ? ""
                                                : (item?.release_date ||
                                                      item?.first_air_date) &&
                                                  `(${formatDate({
                                                      date:
                                                          item.release_date ||
                                                          item.first_air_date,
                                                      year: true,
                                                  })})`}
                                        </h4>
                                        <div className="border-neutral-800 border rounded py-1 px-2  group-hover:bg-[#c147e9] group-hover:text-white transition-all">
                                            {item?.media_type === "tv"
                                                ? "TV"
                                                : item?.media_type
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  item.media_type.slice(1)}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="w-full h-20 flex justify-center items-center">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="italic px-2"
                                >
                                    No results found.
                                </motion.p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Searchbar;
