import axios from "../utils/axios";
import { get } from "lodash";
import { useState, useEffect, useCallback } from "react";

const useFetch = ({
    url,
    apiName,
    options = {},
    dataPath = "data.results",
    returnRaw = false,
}) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(null);

    const fetchData = useCallback(async () => {
        setIsPending(true);
        setError(null);

        try {
            const response = await axios.post(`/api/${apiName}`, {
                url,
                ...options,
            });

            const extractedData = dataPath
                ? get(response, dataPath)
                : response.data;

            setData((prev) => {
                if (returnRaw) return extractedData;
                const uniqueData =
                    extractedData?.length > 0
                        ? extractedData.filter(
                              (newItem) =>
                                  !prev.some(
                                      (prevItem) => prevItem.id === newItem.id
                                  )
                          )
                        : [];
                return [...prev, ...uniqueData];
            });

            if (response.data.total_results !== undefined) {
                setTotalResults(response.data.total_results);
            }

            if (response.data.total_pages !== undefined) {
                setTotalPages(response.data.total_pages);
            }

            setIsPending(false);
        } catch (error) {
            setError({ status: error.response?.status ?? 500, message: error?.message});
            setIsPending(false);
        }
    }, [url]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isPending, error, setData, totalResults, totalPages };
};

export default useFetch;
