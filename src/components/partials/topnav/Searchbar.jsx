import React, { useRef, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoints } from "../../../utils/constants";
import useFetch from "../../../hooks/useFetch";
import Loader from "../global/Loader";

const Searchbar = ({ isDisable = false }) => {
    const [query, setQuery] = useState("");
    const [toggleSearch, setToggleSearch] = useState(false);
    const searchRef = useRef(null); // Create a ref for the search container
    const navigate = useNavigate()

    const {
        data: searches,
        setData: setSearches,
        isPending: isLoading,
    } = useFetch(apiEndpoints.search.multi({ query }));

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
                isDisable ? "flex md:hidden" : "hidden md:flex"
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
                        navigate(`/search/${query}`)
                    }}
                >
                    <input
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setToggleSearch(true);
                        }}
                        onClick={() => setToggleSearch(true)}
                        className="w-full bg-transparent outline-none px-3 py-3"
                        placeholder="What are you looking for?"
                        type="text"
                        value={query}
                        name="query"
                        autoComplete="off"
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
                    <div className="absolute z-50 top-[100%] left-0 mt-2 w-full max-h-72 overflow-y-auto rounded-md text-neutral-200 bg-neutral-900 border border-zinc-700">
                        {isLoading ? (
                            <div className="w-full flex justify-center items-center p-1">
                                <Loader classname={'w-8 h-8'} />
                            </div>
                        ) : searches.length > 0 && query.length > 0 ? (
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
                            <p className="font-thin italic px-2">
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
