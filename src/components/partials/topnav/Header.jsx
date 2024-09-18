import React, { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { HiOutlineMenu } from "react-icons/hi";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// Large viewport header
const Header = ({ toggleSidebar }) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);

    const variants = {
        visible: { top: "0" },
        hidden: { top: "-100%" },
    };

    const updateHeader = (latest, prev) => {
        if (latest < prev) {
            setHidden(false);
        } else if (latest > 100 && latest > prev) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        updateHeader(latest, prevScroll);
        setPrevScroll(latest);
    });

    return (
        <motion.div
            variants={variants}
            initial={{ top: 0 }}
            animate={hidden ? "hidden" : "visible"}
            transition={{
                ease: [0.1, 0.25, 0.3, 1],
                duration: 0.6,
            }}
            className="w-full flex justify-between py-3 md:py-2 md:pb-4 px-4 md:px-12 bg-[#0F0617] fixed z-[1] left-0 top-0 navbarBorder"
        >
            <Link
                to="/"
                className="w-fit flex gap-1 items-center justify-center"
            >
                <img className="w-10 h-10" src="/sms.png" alt="logo" />
                <h1 className="text-2xl lobster tracking-wide">SMS.</h1>
            </Link>
            <Searchbar />
            <div className="text-3xl flex items-center gap-2">
                <button onClick={toggleSidebar}>
                    <HiOutlineMenu />
                </button>
            </div>
        </motion.div>
    );
};

export default Header;
