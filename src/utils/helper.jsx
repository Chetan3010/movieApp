import axios from "axios";
import { defaultConst } from "./constants";
import Seprator from "../components/partials/global/Seprator";
import { Fragment } from "react";

export const getMyRegion = async (req) => {
    const { data } = await axios.get(`https://api.ipify.org?format=json`);
    const response = await axios.get(
        `https://ipwho.is/${data.ip}?fields=country_code`
    );
    return (await response.data.country_code) || "IN";
};

export const getMyTimezone = async (req) => {
    const { data } = await axios.get(`https://api.ipify.org?format=json`);
    const response = await axios.get(
        `https://ipwho.is/${data.ip}?fields=timezone`
    );
    return (await response.data.timezone.abbr) || "IST";
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

export const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return `${minutes}m`;
    }
};

export const formatDate = ({
    date,
    year = false,
    month = false,
    day = false,
}) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: year ? "numeric" : undefined,
        month: month ? "short" : undefined,
        day: day ? "numeric" : undefined,
    });
};

export const getFileName = ({ title, file }) => {
    const clean_name =
        title.split(" ").join("-") +
        "_" +
        Math.random().toString(36).substring(2, 15) +
        `.${file.split(".")[1]}`;
    return clean_name;
};

export const getRating = (vote_average) => {
    const rating = vote_average
        ? vote_average % 1 === 0
            ? vote_average.toFixed(0)
            : vote_average.toFixed(1)
        : "NR";
    return rating;
};
