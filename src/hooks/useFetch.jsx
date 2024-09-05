import axios from "axios";
import { get } from "lodash";
import { useState, useEffect, useCallback, useRef } from "react";

const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/proxy" // Adjust this port if your dev server uses a different one
        : "/api/proxy";

const useFetch = ({
    endpoint,
    params = {},
    options = {},
    dataPath = "data.results",
    returnRaw = false,
    method = "GET",
}) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(null);

    const endpointRef = useRef(endpoint);
    const paramsRef = useRef(params);
    const optionsRef = useRef(options);
    const methodRef = useRef(method);

    const fetchData = useCallback(async () => {
        setIsPending(true);
        setError(null);

        try {
            const timestamp = new Date().getTime();
            const requestConfig = {
                method: methodRef.current,
                url: API_BASE_URL,
                params:
                    methodRef.current === "GET"
                        ? {
                              url: endpointRef.current,
                              ...paramsRef.current,
                              _t: timestamp,
                          }
                        : { _t: timestamp },
                data:
                    methodRef.current === "POST"
                        ? { url: endpointRef.current, ...paramsRef.current }
                        : undefined,
                ...optionsRef.current,
            };

            console.log("Sending request with config:", requestConfig);

            const response = await axios(requestConfig);

            console.log("Received response:", response);

            const extractedData = dataPath
                ? get(response, dataPath)
                : response.data;

            console.log("Extracted Data:", extractedData); // For debugging

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
            console.error("Error in API request:", err);
            if (err.response) {
                console.error("Response status:", err.response.status);
                console.error("Response data:", err.response.data);
            }
            setError(err.response?.data?.error || err.message);
            setIsPending(false);
        }
    }, [dataPath, returnRaw]);

    useEffect(() => {
        endpointRef.current = endpoint;
        paramsRef.current = params;
        optionsRef.current = options;
        methodRef.current = method;
        fetchData();
    }, [endpoint, params, options, method, fetchData]);

    return {
        data,
        isPending,
        error,
        setData,
        totalResults,
        totalPages,
        refetch: fetchData,
    };
};

export default useFetch;
