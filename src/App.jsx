import React, { useState } from "react";
import Sidenav from "./components/Sidenav";
import Searchbar from "./components/partials/Searchbar";
import Home from "./components/Home";

const App = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false)
    return (
        <div className={`w-full bg-[#0F0617] text-white san-public relative`}>
            { isSidenavOpen && <div onClick={()=>setIsSidenavOpen(false)} className="w-full absolute right-0 top-0 h-full bg-black opacity-70 z-[110]"></div>}
            <Sidenav isSidenavOpen={isSidenavOpen} setIsSidenavOpen={setIsSidenavOpen} />
            <Home />
        </div>
    );
};

export default App;
