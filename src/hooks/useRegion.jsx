import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { getRegionAndTimezone } from "../utils/helper";

const useRegion = () => {
    const [region, setRegion] = useLocalStorage({ key: "region", defaultValue: "IN" });
    const [timezone, setTimezone] = useLocalStorage({ key: "timezone", defaultValue: "IST" });

    useEffect(() => {
        // Fetch and store region and timezone if not already in localStorage
        if (!region || region === "IN" || !timezone || timezone === "IST") {
            getRegionAndTimezone()
                .then(({ region, timezone }) => {
                    setRegion(region);
                    setTimezone(timezone);
                })
                .catch(() => {
                    setRegion("IN");
                    setTimezone("IST");
                });
        }
    }, [region, timezone, setRegion, setTimezone]);

    return { region, timezone };
};

export default useRegion;