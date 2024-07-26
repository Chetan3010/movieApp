import React from "react";
import { BsFire } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { PiShootingStarFill, PiTelevisionSimpleDuotone } from "react-icons/pi";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidenav = () => {
    return (
        <section className="w-1/5 min-h-screen border-r-[1px] border-zinc-500">
            <div className="w-full flex justify-center items-center pt-8">
                <Link
                    to={"/"}
                    className="w-fit flex gap-1 items-center justify-center"
                >
                    <img className="w-10 h-10 " src="/sms.png" alt="logo" />
                    <h1 className="text-2xl lobster tracking-wide">SMS.</h1>
                </Link>
            </div>
            <div className="mt-8 mx-8">
                <h1 className="text-xl font-semibold">New Feeds</h1>
                <div className="mt-2">
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <BsFire />
                        Trending
                    </Link>
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <PiShootingStarFill />
                        Popular
                    </Link>
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <RiMovie2Fill />
                        Movies
                    </Link>
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <PiTelevisionSimpleDuotone />
                        Tv Shows
                    </Link>
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <IoIosPeople />
                        Peoples
                    </Link>
                </div>
            </div>
            <div className="mt-2 mx-8">
                <h1 className="text-xl font-semibold">Website Info</h1>
                <div className="mt-2">
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <FaCircleInfo />
                        About SMS
                    </Link>
                    <Link
                        to={""}
                        className="flex gap-3  items-center py-4 text-lg text-zinc-200 hover:bg-zinc-800 hover:text-[#C147E9] pl-5 rounded-md"
                    >
                        <MdEmail />
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Sidenav;
