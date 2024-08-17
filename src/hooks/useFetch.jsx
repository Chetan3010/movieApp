import { get } from "lodash";
import axios from "../utils/axios";
import { useState, useEffect, useCallback } from "react";

export const useFetch = ({ url, options = {}, dataPath = "" }) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0); // Set default to 0
    const [totalPages, setTotalPages] = useState(null); // Set default to 1

    const fetchData = useCallback(async () => {
        setIsPending(true);
        setError(null);

        try {
            const response = await axios.get(url, options);
            const extractedData = dataPath
                ? get(response, dataPath)
                : response.data;

            // Ensure unique data is being added to the state
            setData((prev) => {
                const uniqueData = extractedData.filter(
                    (newItem) =>
                        !prev.some((prevItem) => prevItem.id === newItem.id)
                );
                return [...prev, ...uniqueData];
            });

            // Check if total_pages and total_results exist in the response and set them
            if (response.data.total_results !== undefined) {
                setTotalResults(response.data.total_results);
            }

            if (response.data.total_pages !== undefined) {
                setTotalPages(response.data.total_pages);
            }

            setIsPending(false);
        } catch (err) {
            setError(err.message);
            setIsPending(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isPending, error, setData, totalResults, totalPages };
};
