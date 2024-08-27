import React, { useState, useRef, useEffect } from "react";
import Searchbar from "../partials/Searchbar";
import { NavLink } from "react-router-dom";
import Header from "../partials/Header";
import TopNavHeader from "../partials/TopNavHeader";
import TopNavLinks from "../partials/TopNavLinks";

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

    return (
        <>
            {isSidenavOpen && (
                <div className="w-full absolute right-0 top-0 h-full bg-black opacity-70 z-[110]"></div>
            )}
            <section className="w-full border-zinc-500 relative selection:bg-none bg-[#0F0617]">
                <Header toggleSidebar={toggleSidebar} />
                <div
                    ref={sidenavRef}
                    className={`fixed top-0 right-0 h-full bg-[#0F0617] z-[111] overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0,0.55,0.45,1)] ${
                        isSidenavOpen
                            ? "translate-x-0 w-[100%] md:w-[22%]"
                            : "translate-x-full w-0"
                    }`}
                >
                    <div className="p-4">
                        <TopNavHeader
                            setIsSidenavOpen={setIsSidenavOpen}
                            isSidenavOpen={isSidenavOpen}
                        />
                        <Searchbar isDisable={true} />
                        <NavLink
                            to="/"
                            className={`flex gap-3 items-center py-4 text-neutral-200 hover:bg-[#29143a96] hover:text-[#C147E9] pl-5 rounded-md`}
                        >
                            Home
                        </NavLink>
                    </div>
                    <TopNavLinks />
                </div>
            </section>
        </>
    );
};

export default Topnav;
