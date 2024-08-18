import axios from "axios";
import { apiEndpoints } from "./constants";

const instance = axios.create({
    baseURL: apiEndpoints.others.proxyServer,
    headers: {
        Accept: "application/json",
    }
})

export default instance