import { useEffect, useState } from 'react';

function useWindowWidth() {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 991);
    const [isTabletSMScreen, setisTabletSMScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 991);
            setisTabletSMScreen(window.innerWidth < 768)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isLargeScreen, isTabletSMScreen]);

    return {isLargeScreen, isTabletSMScreen};
}

export default useWindowWidth;