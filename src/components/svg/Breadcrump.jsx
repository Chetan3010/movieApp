import React from "react";

const Breadcrump = ({ classname }) => {
    return (
        <svg
            className={`text-gray-400 ${classname}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
            />
        </svg>
    );
};

export default Breadcrump;
