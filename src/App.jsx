import React from "react";
import Sidenav from "./components/Sidenav";
import Searchbar from "./components/partials/Searchbar";
import Carousel from "./components/Caraousel";

const App = () => {
    // text-[#C147E9]
    return (
        <div className="w-full min-h-screen bg-zinc-900 text-white flex san-public">
            <Sidenav />
            <div className="w-full">
                <Searchbar />
                <Carousel />
            </div>
        </div>
    );
};

export default App;
