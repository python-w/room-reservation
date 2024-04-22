import { useState, useEffect } from "react";

const useScrollToTop = () => {
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".search_wrap");
    const handleScroll = () => {
      const targetTop = target.offsetTop;
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
  }, []);

  return isTop;
};

export default useScrollToTop;
