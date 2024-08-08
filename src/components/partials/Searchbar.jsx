import React, { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Searchbar = ({ toggleSearch, setToggleSearch, isDisable=false}) => {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimeout = useRef(null);

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            if (query) {
                getSearches();
            }
        }, 1000);
        return () => clearTimeout(debounceTimeout.current);
    }, [query]);

    return (
        <div className={`h-fit w-full md:w-[70%] justify-center mt-2 ${isDisable ? "flex md:hidden" : "hidden md:flex"}`}>
            <div className="w-full md:w-[70%] relative bg-transparent border-[1px] border-zinc-600 px-4 flex items-center rounded mb-4 md:mb-0 md:rounded-full">
                <BsSearch className="cursor-pointer" />
                <input
                    onChange={(e) => {
                        setIsLoading(true)
                        setQuery(e.target.value)
                    }}
                    className="w-full bg-transparent outline-none px-3 py-3"
                    placeholder="What are you looking for?"
                    type="text"
                    value={query}
                    name="query"
                />
                <RxCross1
                    className="cursor-pointer"
                    onClick={() => {
                        if(query) {
                            setQuery("")
                            setSearches([])
                            return 
                        }
                        setToggleSearch(false)
                    }}
                />
                {query && (
                    <div className="absolute z-50 top-[100%] left-0 mt-2 w-full max-h-80 overflow-y-auto rounded-md p-1 bg-zinc-900 border border-zinc-700">
                        {isLoading ? (
                            <p className="font-thin italic">Searching...</p>
                        ) : searches.length > 0 && query.length > 0 ? (
                            searches.map(
                                (item) =>
                                    (item.poster_path ||
                                        item.backdrop_path ||
                                        item.profile_path) && (
                                        <Link
                                            key={item.id}
                                            className="flex items-center gap-5 hover:bg-[#311747fd] hover:text-[#C147E9] rounded p-1"
                                            to={""}
                                        >
                                            <img
                                                className="w-14 h-20 bg-blue-300 rounded object-cover object-center border-[1px] border-zinc-700"
                                                src={`https://image.tmdb.org/t/p/w500/${
                                                    item.poster_path ||
                                                    item.backdrop_path ||
                                                    item.profile_path
                                                }`}
                                                alt="banner"
                                            />
                                            <h4>{item.title || item.name}</h4>
                                        </Link>
                                    )
                            )
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
