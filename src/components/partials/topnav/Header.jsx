import React, { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { HiOutlineMenu } from "react-icons/hi";

const Header = ({ toggleSidebar }) => {
    const [toggleSearch, setToggleSearch] = useState(false);
    return (
        <div className="w-full flex justify-between py-2 px-4 md:px-12">
            <Link
                to="/"
                className="w-fit flex gap-1 items-center justify-center"
            >
                <img className="w-10 h-10" src="/sms.png" alt="logo" />
                <h1 className="text-2xl lobster tracking-wide">SMS.</h1>
            </Link>
            <Searchbar
                toggleSearch={toggleSearch}
                setToggleSearch={setToggleSearch}
            />
            <div className="text-3xl flex items-center gap-2">
                <button onClick={toggleSidebar}>
                    <HiOutlineMenu />
                </button>
            </div>
        </div>
    );
};

export default Header;
