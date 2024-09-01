import React, { useEffect, useRef, useState } from "react";

const RegionDropdown = ({ defaultOption, options, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative w-full selection:bg-none text-neutral-300 text-lg font-medium"
            ref={dropdownRef}
        >
            <button
                onClick={handleToggle}
                className="bg-zinc-500 rounded-md w-full gap-2 px-3 py-2 flex items-center justify-between"
            >
                <span className="">
                    {selectedOption
                        ? selectedOption.iso_3166_1 === defaultOption.iso_3166_1
                        ? `Default (${defaultOption?.iso_3166_1})`
                        : `${selectedOption.english_name} (${selectedOption.iso_3166_1})`
                        : `Default (${defaultOption?.iso_3166_1})`
                    }
                </span>
                <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute mt-1 rounded-md w-full top-[100%] right-0 bg-zinc-500 ounded-md z-10 overflow-hidden">
                    <ul className="max-h-52 overflow-y-scroll font-light">
                        <li
                            onClick={() => handleOptionClick(defaultOption)}
                            className={`cursor-pointer px-3 py-1 border-neutral-400 border-b text-wrap ${ selectedOption.iso_3166_1 === defaultOption.iso_3166_1 ? 'bg-zinc-800' : 'bg-zinc-700'} hover:text-[#C147E9]`}
                        >
                            {`Default (${defaultOption.iso_3166_1})`}
                        </li>
                        {options
                            .sort((a, b) =>
                                a.english_name.localeCompare(b.english_name)
                            )
                            .map(
                                (option, index) =>
                                    option.iso_3166_1 !==
                                        defaultOption.iso_3166_1 && (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                handleOptionClick(option)
                                            }
                                            className={`cursor-pointer px-3 py-1 border-neutral-400 border-b text-wrap ${ selectedOption.iso_3166_1 === option.iso_3166_1 ? 'bg-zinc-800' : 'bg-zinc-700'} hover:text-[#C147E9]`}
                                        >
                                            {`${option.english_name} (${option.iso_3166_1})`}
                                        </li>
                                    )
                            )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RegionDropdown;
