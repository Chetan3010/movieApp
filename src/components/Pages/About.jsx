import React from "react";
import Topnav from "../layout/Topnav";
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
