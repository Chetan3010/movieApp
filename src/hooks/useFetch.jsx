import axios from "../utils/axios";
import { get } from "lodash";
import { useState, useEffect, useCallback } from "react";

const useFetch = ({
    endpoint,
    options = {},
    method = 'GET',
    dataPath = "data.results",
    returnRaw = false,
}) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(null);

    const fetchData = useCallback(async () => {
        setIsPending(true);
        setError(null);

        try {
            // const response = await axios.get("/proxy", {
            //     params: { url },
            //     ...options,
            // });

            const response = await axios({
                method,
                url: '/api/proxy',
                params: {url: `https://api.themoviedb.org/3/trending/day/week?language=en-US`},
                ...options
            })

            console.log(response);
            
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
        } catch (err) {
            console.log(err);
            
            setError(err.message);
            setIsPending(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isPending, error, setData, totalResults, totalPages };
};

export default useFetch;
