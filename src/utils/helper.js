import axios from "axios";
import { defaultConst } from "./constants";

export const getMyRegion = async (req) => {
    const { data } = await axios.get(`https://api.ipify.org?format=json`)
    const response = await axios.get(`https://ipwho.is/${data.ip}?fields=country_code`)
    return response.data.country_code || 'IN'
};

export const getMyTimezone = async (req) => {
    const { data } = await axios.get(`https://api.ipify.org?format=json`)
    const response = await axios.get(`https://ipwho.is/${data.ip}?fields=timezone`)
    return response.data.timezone.abbr || 'IST'
};

export const getEndOfScrollPhrase = () => {
    const scrollPhrases = defaultConst.endOfScrollPhrases
    const index = Math.floor(Math.random() * scrollPhrases.length)
    return scrollPhrases[index]
}