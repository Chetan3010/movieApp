import React, { useEffect, useRef, useState } from "react";

const DropdownMenu = ({ title, defaultOp, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedOption, setSelectedOption] = useState(title);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option.value);
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
            className="relative w-full selection:bg-none text-neutral-300 text-base font-medium"
            ref={dropdownRef}
        >
            <button
                onClick={handleToggle}
                className="bg-zinc-600 text-nowrap rounded-md w-full gap-5 px-3 py-2 flex items-center justify-between"
            >
                <span>
                    {selectedOption
                        ? selectedOption.value === defaultOp.value
                            ? `Default`
                            : selectedOption.key
                        : "Default"}
                </span>
                <svg
                    className={`w-2 md:w-4 h-2 md:h-4 text-neutral-300 transform transition-transform duration-200 ${
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
                <div className="absolute mt-1 rounded-md w-64 top-[100%] right-0 bg-zinc-500 ounded-md z-10 overflow-hidden">
                    <ul className="max-h-52 overflow-y-scroll font-light">
                        <li
                            onClick={() => handleOptionClick(defaultOp)}
                            className={`${
                                selectedOption.value === defaultOp.value
                                    ? "bg-neutral-800"
                                    : "bg-zinc-700"
                            } cursor-pointer text-nowrap px-3 py-1 border-neutral-400 border-b bg-zinc-700 hover:text-[#C147E9]`}
                        >
                            {`Default (${defaultOp.key})`}
                        </li>
                        {options.map(
                            (option, index) =>
                                option.value !== defaultOp.value && (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
                                        className={`${
                                            selectedOption.value ===
                                            option.value
                                                ? "bg-neutral-800"
                                                : "bg-zinc-700"
                                        } cursor-pointer text-nowrap px-3 py-1 border-neutral-400  border-b hover:text-[#C147E9]`}
                                    >
                                        {option.key}
                                    </li>
                                )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
