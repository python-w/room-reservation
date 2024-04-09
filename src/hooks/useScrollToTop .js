import { useState, useEffect } from 'react';

const useScrollToTop = (threshold = 100) => {
    const [isTop, setIsTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (document.querySelector('.room_reservation_banner')) {
                const bannerHeight = document.querySelector('.room_reservation_banner').clientHeight;
                const scrollTop = window.scrollY;
                if (scrollTop >= bannerHeight) {
                    setIsTop(true);
                } else {
                    setIsTop(false);
                }
            } else {
                const scrollTop = window.scrollY;

                if (scrollTop > threshold) {
                    setIsTop(true);
                } else {
                    setIsTop(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return isTop;
};

export default useScrollToTop;