import axios from "axios";
import { apiEndpoints, defaultConst } from "./constants";
import Seprator from "../components/partials/global/Seprator";
import { Fragment } from "react";

export const getRegionAndTimezone = async () => {
    try {
        const { data: ipData } = await axios.get(apiEndpoints.user.ip);
        const { data: locationData } = await axios.get(
            apiEndpoints.user.location({ ip: ipData.ip })
        );

        const region = locationData.country_code || "IN";
        const timezone = locationData.timezone.abbr || "IST";

        return { region, timezone };
    } catch (error) {
        return { region: "IN", timezone: "IST" };
    }
};

export const getEndOfScrollPhrase = () => {
    const scrollPhrases = defaultConst.endOfScrollPhrases;
    const index = Math.floor(Math.random() * scrollPhrases.length);
    return scrollPhrases[index];
};

export const getBadQueryPhrase = () => {
    const badQueryPhrases = defaultConst.badQueryPhrases;
    const index = Math.floor(Math.random() * badQueryPhrases.length);
    return badQueryPhrases[index] + " :-(";
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
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return "NA";
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

export const getGender = (g) => {
    switch (g) {
        case 0:
            return "-";
        case 1:
            return "Female";
        case 2:
            return "Male";
        case 3:
            return "NB / Trans / Others";
    }
};

export const copyToClipboard = async ({ text, nodeId }) => {
    try {
      let textToCopy;
  
      if (nodeId) {
        textToCopy = document.getElementById(nodeId).value;
      } else {
        textToCopy = text || window.location.href;
      }
  
      await navigator.clipboard.writeText(textToCopy);
    } catch(e) {
        console.log(e);
      throw new Error("error copying to clipboard");
    }
  };