import { useEffect } from "react";

const useScrollToRef = (handleOpen, ref) => {
  useEffect(() => {
    if (handleOpen && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [handleOpen]);
};

export default useScrollToRef;
