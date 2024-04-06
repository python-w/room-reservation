import { useState, useEffect } from 'react';

const useScrollToTop = (threshold = 100) => {
    const [isTop, setIsTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            if (scrollTop > threshold) {
                setIsTop(true);
            } else {
                setIsTop(false);
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