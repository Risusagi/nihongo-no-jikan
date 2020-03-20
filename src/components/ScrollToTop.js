import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const currLocation = useLocation().pathname;
    
    // scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currLocation]);

    return <></>
};

export default ScrollToTop;