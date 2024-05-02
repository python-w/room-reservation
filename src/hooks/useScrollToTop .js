import { useState, useEffect } from "react";

const useScrollToTop = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    let prevScrollTop = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < prevScrollTop) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }

      prevScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isTop;
};

export default useScrollToTop;
