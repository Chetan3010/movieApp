import React from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Topnav from "../../layout/Topnav";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints } from "../../../utils/constants";

const TvSeason = () => {
    const para = useParams();
    const id = para.id.split("-")[0];
    const sid = para.sid
    const tvName = para.id.split("-")[1]

    const { data: seasonDetails } = useFetch(apiEndpoints.tv.season({ id, sid }));

    const {
        air_date,
        episodes, // array of objects
        name,
        overview,
        poster_path,
        season_number,
        vote_average,
        credits,
        images,
    } = seasonDetails;    

    return (
        <section className="main">
            <ScrollRestoration />
            <Topnav />
            <div className="w-full">
                <div className="px-14">
                    <h1 className="flex gap-2">
                        <p>{tvName}</p> &gt; <p>{season_number}(2014)</p>
                    </h1>
                    <div className="grid">
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TvSeason;
