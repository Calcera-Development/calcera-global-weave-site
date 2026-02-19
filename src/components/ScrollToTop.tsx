import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Only scroll to top if there is no hash (section navigation)
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, location.hash]);

    return null;
};

export default ScrollToTop;
