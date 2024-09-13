import React, { Fragment, useEffect, useState } from "react";
import { BsFillTvFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosArrowDown, IoIosPeople } from "react-icons/io";
import { MdEmail, MdTravelExplore } from "react-icons/md";
import { PiMonitorPlayFill } from "react-icons/pi";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink, useMatches } from "react-router-dom";

const TopNavLinks = () => {
    const [links, setLinks] = useState([
        {
            id: 1,
            title: "Feeds",
            icon: <IoIosArrowDown />,
            isOpen: false,
            subLinks: [
                {
                    title: "Now Playing",
                    icon: <PiMonitorPlayFill />,
                    // icon: <BsFire />,
                    url: "/now-playing",
                },
                {
                    title: "Explore",
                    icon: <MdTravelExplore />,
                    url: "/explore",
                },
                {
                    title: "Movies",
                    icon: <RiMovie2Fill />,
                    url: "/movie",
                },
                {
                    title: "TV Shows",
                    icon: <BsFillTvFill />,
                    url: "/tv",
                },
                {
                    title: "Peoples",
                    icon: <IoIosPeople />,
                    url: "/person",
                },
            ],
        },
        {
            id: 2,
            title: "Website Info",
            icon: <IoIosArrowDown />,
            isOpen: false,
            subLinks: [
                {
                    title: "About SMS",
                    icon: <FaCircleInfo />,
                    url: "/about",
                },
                {
                    title: "Contact",
                    icon: <MdEmail />,
                    url: "/contact",
                },
            ],
        },
    ]);

    const matches = useMatches();

    useEffect(() => {
        setLinks((prevLinks) =>
            prevLinks.map((link) => {
                // Check if the current route matches any of the subLinks
                const isMatch = link.subLinks.some((subLink) =>
                    matches.some((match) => match.pathname === subLink.url)
                );
                // Set isOpen to true if there is a match
                return {
                    ...link,
                    isOpen: isMatch,
                };
            })
        );
    }, [matches]);

    const toggleIsOpen = (id) => {
        setLinks((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isOpen: !item.isOpen } : item
            )
        );
    };

    return (
        <>  
            {links.map((item, index) => (
                <Fragment key={index}>
                    <div className="border-t-[2px] border-zinc-700"></div>
                    <div className="p-4">
                        <h1
                            onClick={() => toggleIsOpen(item.id)}
                            className="px-4 text-gray-400 flex justify-between items-center cursor-pointer"
                        >
                            {item.title + " "}
                            <i
                                className={`${
                                    item.isOpen ? "rotate-180" : "rotate-0"
                                } transition-transform duration-300 ease-in-out`}
                            >
                                {item.icon}
                            </i>
                        </h1>
                        <div
                            className={`${
                                item.isOpen ? "block" : "hidden"
                            } mt-2`}
                        >
                            {item.subLinks.map((_item, _index) => (
                                <NavLink
                                    key={_index}
                                    to={_item.url}
                                    className={
                                        "flex gap-3 items-center py-4 text-zinc-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md mb-1"
                                    }
                                >
                                    {_item.icon}
                                    {_item.title}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </Fragment>
            ))}
        </>
    );
};

export default TopNavLinks;
