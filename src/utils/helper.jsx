import axios from "axios";
import { defaultConst } from "./constants";
import Seprator from "../components/partials/Seprator";
import { Fragment } from "react";

export const getMyRegion = async (req) => {
    const { data } = await axios.get(`https://api.ipify.org?format=json`);
    const response = await axios.get(
        `https://ipwho.is/${data.ip}?fields=country_code`
    );
    return await response.data.country_code || "IN";
};

export const getMyTimezone = async (req) => {
    const { data } = await axios.get(`https://api.ipify.org?format=json`);
    const response = await axios.get(
        `https://ipwho.is/${data.ip}?fields=timezone`
    );
    return await response.data.timezone.abbr || "IST";
};

export const getEndOfScrollPhrase = () => {
    const scrollPhrases = defaultConst.endOfScrollPhrases;
    const index = Math.floor(Math.random() * scrollPhrases.length);
    return scrollPhrases[index];
};

export const getGenreNames = (genres, genreIds) => {
    const displayGenres = genreIds.map(
        (id) => genres.find((genre) => genre.id === id)?.name
    );

    return (
        <span className="flex justify-center items-center gap-1">
            {displayGenres.map((item, index) => {
                const element =
                    index === displayGenres.length - 1 ? (
                        item
                    ) : (
                        <Fragment key={index}>
                            {item}
                            <Seprator />
                        </Fragment>
                    );
                return element;
            })}
        </span>
    );
};
