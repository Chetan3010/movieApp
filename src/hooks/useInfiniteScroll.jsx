import React, { useCallback, useRef, useState } from "react";

const useInfiniteScroll = ({
    isPending,
    page,
    setPage,
    totalPages,
}) => {
    const observer = useRef();
    const [isDone, setIsDone] = useState(false);

    const lastItemRef = useCallback(
        (node) => {
            if (!navigator.onLine) {
                observer.current.disconnect();
                return;
            };
            if (isPending) return;
            if (totalPages && page >= totalPages) {
                setIsDone(true);
                return;
            }
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isPending]
    );

    return { lastItemRef, isDone };
};

export default useInfiniteScroll