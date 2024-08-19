import React, { useEffect, useState } from "react";

const useLocalStorage = ({ key, defaultValue }) => {
    
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });
    
    useEffect(() => {
        if (value === undefined) return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export default useLocalStorage;
