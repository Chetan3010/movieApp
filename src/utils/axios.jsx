import axios from "axios";
import { env } from "./constants";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Accept: "application/json",
        Authorization: env.TMDB_AUTH
    }
})

export default instance