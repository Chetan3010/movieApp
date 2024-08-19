import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { getMyRegion, getMyTimezone } from "../utils/helper";

const useRegion = () => {
    const [region, setRegion] = useLocalStorage({ key: "region", defaultValue: "US" });
    const [timezone, setTimezone] = useLocalStorage({ key: "timezone", defaultValue: "UTC" });

    useEffect(() => {
        // Fetch and store region if not already in localStorage
        if (!region || region === "US") {
            getMyRegion().then(setRegion).catch(() => setRegion("IN"));
        }

        // Fetch and store timezone if not already in localStorage
        if (!timezone || timezone === "UTC") {
            getMyTimezone().then(setTimezone).catch(() => setTimezone("IST"));
        }
    }, [region, timezone, setRegion, setTimezone]);

    return { region, timezone };
};

export default useRegion