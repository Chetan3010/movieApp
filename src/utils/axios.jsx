import axios from "axios";
import { apiEndpoints, env } from "./constants";

const instance = axios.create({
    baseURL: apiEndpoints.others.proxyServer || apiEndpoints.others.proxyServerLocal,
    headers: {
        Accept: "application/json",
        Authorization: env.TMDB_AUTH
    }
})

export default instance