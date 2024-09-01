import React from "react";
import Topnav from "../partials/topnav/Topnav";
import { ScrollRestoration } from "react-router-dom";

const About = () => {
    return (
        <section className={`main`}>
            <ScrollRestoration />
            <Topnav />
            about
        </section>
    );
};

export default About;
