import React from "react";
import loader from '/loader.svg'

const Loader = () => (
    <div className="w-full h-screen flex justify-center items-start md:items-center">
        <img className="w-12 h-12 md:w-24 md:h-24" src={loader} alt="loader"/>
    </div>
);

export default Loader;
