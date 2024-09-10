import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

// Small viewport header
const TopNavHeader = ({ setIsSidenavOpen }) => {
    return (
        <div className={`flex justify-between mb-4 md:hidden`}>
            <Link to={"/"}>
                <div className="w-fit flex gap-1 items-center justify-center">
                    <img className="w-10 h-10" src="/sms.png" alt="logo" />
                    <h1 className="text-2xl lobster tracking-wide">SMS.</h1>
                </div>
            </Link>
            <button
                onClick={() => setIsSidenavOpen((prev) => !prev)}
                className="text-3xl"
            >
                <RxCross1 />
            </button>
        </div>
    );
};

export default TopNavHeader;
