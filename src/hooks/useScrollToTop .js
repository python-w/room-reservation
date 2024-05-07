import { useState, useEffect } from "react";

const useScrollToTop = () => {
  const [isTop, setIsTop] = useState(null);

  useEffect(() => {
    let prevScrollTop = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      console.log(scrollTop, isTop)
      if (scrollTop !== 0 && scrollTop < prevScrollTop) {
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
  }, [isTop]);

  return isTop;
};

export default useScrollToTop;
