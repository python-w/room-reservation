import { useState, useEffect } from "react";

const useScrollToTop = (threshold = 100) => {
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".search_wrap");
    const targetTop = target.offsetTop;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > targetTop) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isTop;
};

export default useScrollToTop;
