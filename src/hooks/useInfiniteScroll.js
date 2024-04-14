import { useState, useEffect } from "react";

const useInfiniteScroll = () => {
  const [isBottom, setIsBottom] = useState(false);
  const handleInfiniteScroll = () => {
    const roomListing = document.querySelector(".room_listing");
    if (!roomListing) return;
    const roomListingRect = roomListing.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const bottom = roomListingRect.bottom <= windowHeight;

    setIsBottom(bottom);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return isBottom;
};

export default useInfiniteScroll;
