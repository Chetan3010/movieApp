import axios from "../utils/axios";
import { get } from "lodash";
import { useState, useEffect, useCallback } from "react";

export const useFetch = ({ url, options = {}, dataPath = "", returnNew=false }) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(null);

    const fetchData = useCallback(async () => {
        setIsPending(true);
        setError(null);

        try {
            const response = await axios.get('/proxy', {
                params: { url }, // Pass the API URL as a query parameter to the proxy
                ...options
            });
            const extractedData = dataPath
                ? get(response, dataPath)
                : response.data;

            setData((prev) => {
                if(returnNew) return extractedData
                const uniqueData = extractedData.filter(
                    (newItem) =>
                        !prev.some((prevItem) => prevItem.id === newItem.id)
                );
                return [...prev, ...uniqueData];
            });

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
