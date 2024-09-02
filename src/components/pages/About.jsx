import React from "react";
import Topnav from "../partials/topnav/Topnav";
import { ScrollRestoration } from "react-router-dom";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";

const About = () => {
    return (
        <>
            <ScrollRestorationCustom />
            <section className={`main`}>
                <Topnav />
                about
            </section>
        </>
    );
};

export default About;
