import Lenis from "lenis";
import { useEffect } from "react";

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1, // Smooth scroll duration
            smooth: true, // Enable smooth scrolling
            direction: "vertical", // Scroll direction
            gestureDirection: "vertical", // Gesture direction for touch devices
            smoothTouch: true, // Enable smooth scrolling on touch devices
            infinite: false, // Disable infinite scrolling
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy(); // Clean up on component unmount
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
