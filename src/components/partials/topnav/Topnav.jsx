import React, { useState, useRef, useEffect } from "react";
import Searchbar from "../../partials/topnav/Searchbar";
import { Link, NavLink } from "react-router-dom";
import Header from "../../partials/topnav/Header";
import TopNavHeader from "../../partials/topnav/TopNavHeader";
import TopNavLinks from "../../partials/topnav/TopNavLinks";
import { motion } from "framer-motion";

const Topnav = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const sidenavRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidenavRef.current &&
                !sidenavRef.current.contains(event.target)
            ) {
                setIsSidenavOpen(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const variants = {
        open: {
            opacity: 1,
            x: 0,
        },
        closed: {
            opacity: 0,
            x: "100%",
        },
    };
    return (
        <>
            {isSidenavOpen && (
                <div className="w-full absolute right-0 top-0 h-full bg-black opacity-70 z-[110]"></div>
            )}
            <section className="w-full border-zinc-500 md:pt-0 relative selection:bg-none bg-[#0F0617]">
                <Header toggleSidebar={toggleSidebar} />
                <motion.div
                    initial={variants.closed}
                    animate={isSidenavOpen ? "open" : "closed"}
                    transition={{ easings: 'easeInOutSine'}}
                    variants={variants}
                    ref={sidenavRef}
                    className={`fixed top-0 w-[100%] md:w-[22%] right-0 h-full bg-[#0F0617] z-[111] overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0,0.55,0.45,1)]`}
                >
                    <div className="p-4">
                        <TopNavHeader setIsSidenavOpen={setIsSidenavOpen} />
                        <Searchbar
                            isHidden
                            setIsSidenavOpen={setIsSidenavOpen}
                        />
                        {/* <div className="flex gap-3 justify-start mb-3 px-5">
                            <Link
                                to={'/account/login'}
                                className={`w-1/2 flex gap-3 items-center justify-center py-2 border border-neutral-400 bg-neutral-300  text-black text-lg font-bold rounded-md`}
                            >
                                Login
                            </Link>
                            <Link
                                className={`w-1/2 flex gap-3 items-center justify-center py-2 border border-neutral-400 bg-neutral-300  text-black text-lg font-bold rounded-md`}
                            >
                                Profile
                            </Link>
                        </div> */}
                        <NavLink
                            to="/"
                            className={`flex gap-3 items-center py-4 text-neutral-200 hover:bg-[#29143a96] hover:text-[#C147E9] transition-all duration-200 ease-in pl-5 rounded-md`}
                        >
                            Home
                        </NavLink>
                    </div>
                    <TopNavLinks />
                </motion.div>
            </section>
        </>
    );
};

export default Topnav;
