import React from "react";

const Loader = ({ classname }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 128 128"
            xmlSpace="preserve"
            className={`${classname } transition-all duration-150 ease-in`}
        >
            <defs>
                <linearGradient id="linear-gradient">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#c147e9" />
                </linearGradient>
            </defs>
            <g>
                <path
                    d="M63.85 0A63.85 63.85 0 1 1 0 63.85 63.85 63.85 0 0 1 63.85 0zm.65 19.5a44 44 0 1 1-44 44 44 44 0 0 1 44-44z"
                    fill="url(#linear-gradient)"
                    fillRule="evenodd"
                />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 64 64"
                    to="360 64 64"
                    dur="1080ms"
                    repeatCount="indefinite"
                />
            </g>
        </svg>
);

export default Loader;
