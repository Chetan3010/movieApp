import React from "react";
import { ScrollRestoration } from "react-router-dom";

const ScrollRestorationCustom = () => {
    return (
        <ScrollRestoration
            getKey={(location) => {
                // Handle known static paths
                const staticPaths = [
                    "/",
                    "/now-playing",
                    "/explore",
                    "/movie",
                    "/tv",
                    "/person",
                    "/about",
                ];

                // Dynamic path patterns
                const dynamicPathPatterns = [
                    /^\/movie\/\d+$/,
                    /^\/tv\/\d+$/,
                    /^\/tv\/\d+\/season\/\d+$/,
                    /^\/tv\/\d+\/season\/\d+\/episode\/\d+$/,
                ];

                // Match against static paths
                if (staticPaths.includes(location.pathname)) {
                    return location.pathname;
                }

                // Match against dynamic paths
                for (const pattern of dynamicPathPatterns) {
                    if (pattern.test(location.pathname)) {
                        return pattern.toString(); // Or another unique identifier
                    }
                }

                // Fallback: Use the location key
                return location.key;
            }}
        />
    );
};

export default ScrollRestorationCustom;
