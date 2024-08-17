import React, { useEffect, useRef, useState } from "react";

const DropdownMenu = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-24 md:w-48 selection:bg-none flex items-center" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="bg-zinc-800 shadow-lg text-xs md:text-base w-full gap-2 leading-none rounded px-2 md:px-3 py-2 flex items-center justify-between hover:bg-zinc-700 hover:text-[#C147E9] focus:outline-none"
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-2 md:w-5 h-2 md:h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 md:mt-2 text-xs md:text-base w-24 md:w-48 top-[100%] right-0 bg-zinc-800 shadow-lg rounded-md z-10">
          <ul className="p-1 md:p-2">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer px-1 md:px-2 py-1 md:py-2 hover:bg-zinc-700 rounded hover:text-[#C147E9]"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
