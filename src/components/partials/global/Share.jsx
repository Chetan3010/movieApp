import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";

const Share = () => {
    const shareData = {
        title: document.title,
        url: window.location.href, // This will use the current page's URL
    };

    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href,
            });
            // .then(() => console.log("Successful share"))
            // .catch((error) => console.log("Error sharing", error));
        } else {
            console
                .log
                // "Share not supported on this browser, do it the old way."
                ();
        }
    };
    return (
        <button
            onClick={share}
            className="hover:text-[#c147e9] px-2 transition-all duration-100 ease-in text-2xl cursor-pointer"
        >
            <IoMdShare />
        </button>
    );
};

export default Share;
