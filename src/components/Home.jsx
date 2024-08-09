import React, { useEffect, useState } from "react";
import Caraousel from "./Caraousel";
import HorizontalCards from "./partials/HorizontalCards";
import axios from "../utils/axios";

const Home = () => {
	const [popularCards, setPopularCards] = useState([])
	const getPopularCards = async () => {
        try {
            const { data } = await axios.get(`/movie/popular?region=IN`);
            setPopularCards(() =>
                data.results.filter((item) => item.poster_path !== null)
            );
        } catch (error) {
            console.error(error);
        }
    };
	
	useEffect(() => {
		getPopularCards()
	}, [])
	
    return (
        <>
            <Caraousel />
            <div className="">
                <HorizontalCards title="Popular" items={popularCards} filter={false} />
            </div>
        </>
    );
};

export default Home;
