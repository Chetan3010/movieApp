import React, { useState } from "react";
import { BsFire } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosArrowDown, IoIosPeople } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { PiShootingStarFill, PiTelevisionSimpleDuotone } from "react-icons/pi";
import { RiMovie2Fill } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Searchbar from "./partials/Searchbar";
import { Link } from "react-router-dom";
import { CgCross } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

const Sidenav = ({ isSidenavOpen, setIsSidenavOpen }) => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const [isNewFeedsOpen, setIsNewFeedsOpen] = useState(false);
    const [isWebsiteInfoOpen, setIsWebsiteInfoOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    return (
        <section className="w-full border-zinc-500 relative selection:bg-none">
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
            <div
                className={`fixed top-0 right-0 h-full bg-[#0F0617] z-[111] overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0,0.55,0.45,1)] ${
                    isSidenavOpen
                        ? "translate-x-0 w-[100%] md:w-[22%]"
                        : "translate-x-full w-0"
                }`}
            >
                <div className="p-4">
                    <div
                        onClick={() => setIsSidenavOpen(!isSidenavOpen)}
                        className={`flex justify-between mb-4 md:hidden`}
                    >
                        <div className="w-fit flex gap-1 items-center justify-center">
                            <img
                                className="w-10 h-10"
                                src="/sms.png"
                                alt="logo"
                            />
                            <h1 className="text-2xl lobster tracking-wide">
                                SMS.
                            </h1>
                        </div>
                        <button className="text-3xl">
                            <RxCross1 />
                        </button>
                    </div>
                    <Searchbar isDisable={true} />
                    <h1 className="p-4 rounded-md bg-[#29143a96] text-[#C147E9]">
                        Home
                    </h1>
                </div>
                <div className="border-t-[2px] border-zinc-700"></div>
                <div className="p-4">
                    <h1
                        onClick={() => setIsNewFeedsOpen(!isNewFeedsOpen)}
                        className="px-4 text-gray-400 flex justify-between cursor-pointer"
                    >
                        New Feeds{" "}
                        <i
                            className={`${
                                isNewFeedsOpen ? "rotate-180" : "rotate-0"
                            } transition-transform duration-300 ease-in-out`}
                        >
                            <IoIosArrowDown />
                        </i>{" "}
                    </h1>
                    <div
                        className={`${
                            isNewFeedsOpen ? "block" : "hidden"
                        } mt-2`}
                    >
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <BsFire />
                            Trending
                        </Link>
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <PiShootingStarFill />
                            Popular
                        </Link>
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <RiMovie2Fill />
                            Movies
                        </Link>
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <PiTelevisionSimpleDuotone />
                            Tv Shows
                        </Link>
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <IoIosPeople />
                            Peoples
                        </Link>
                    </div>
                </div>
                <div className="border-t-[2px] border-zinc-700"></div>
                <div className="p-4">
                    <h1
                        onClick={() => setIsWebsiteInfoOpen(!isWebsiteInfoOpen)}
                        className="px-4 mb-2 text-gray-400 flex justify-between cursor-pointer"
                    >
                        Website Info{" "}
                        <i
                            className={`${
                                isWebsiteInfoOpen ? "rotate-180" : "rotate-0"
                            } transition-transform duration-300 ease-in-out`}
                        >
                            <IoIosArrowDown />
                        </i>
                    </h1>
                    <div
                        className={`${
                            isWebsiteInfoOpen ? "block" : "hidden"
                        } mt-2`}
                    >
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <FaCircleInfo />
                            About SMS
                        </Link>
                        <Link
                            to=""
                            className="flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md"
                        >
                            <MdEmail />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sidenav;
