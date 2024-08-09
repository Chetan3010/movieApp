import React, { useState } from "react";
import Sidenav from "./components/Sidenav";
import Home from "./components/Home";

const App = () => {
    return (
        <div className={`w-full min-h-screen bg-[#0F0617] text-white san-public relative`}>
            <Sidenav />
            <Home />
        </div>
    );
};

export default App;
