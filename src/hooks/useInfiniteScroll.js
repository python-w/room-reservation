import { useState, useEffect } from 'react';

const useInfiniteScroll = () => {
    const [isBottom, setIsBottom] = useState(false);

    const handleInfiniteScroll = () => {
        const roomListing = document.querySelector('.room_listing');
        const roomListingRect = roomListing.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const isBottom = roomListingRect.bottom <= windowHeight;

        setIsBottom(isBottom);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);


    return isBottom;
};

export default useInfiniteScroll;