import React, { useEffect, useState } from "react";

const useLocalStorage = ({ key, defaultValue }) => {
    
    /* This code snippet is defining a custom React hook called `useLocalStorage`. */
    const [value, setValue] = useState(() => {
        /* `const storedValue = localStorage.getItem(key);` is retrieving the value stored in the
        localStorage under the specified `key`. It checks if there is a value stored for the given
        key, and if there is, it parses and returns that value using `JSON.parse()`. If there is no
        value stored for the key, it returns the `defaultValue` provided to the `useLocalStorage`
        hook. */
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });
    
    /* The `useEffect` hook in the `useLocalStorage` custom hook is responsible for updating the
    localStorage whenever the `value` or `key` changes.  */
    useEffect(() => {
        if (value === undefined) return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export default useLocalStorage