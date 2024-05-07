import { useEffect } from "react";

const useScrollToRef = (handleOpen, ref) => {
  useEffect(() => {
    const handleScrollToBottom = () => {
      if (handleOpen && ref.current) {
        const refRect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (refRect.bottom > windowHeight) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    };

    handleScrollToBottom();

    // Scroll to bottom ref when handleOpen changes
    if (handleOpen) {
      window.addEventListener("resize", handleScrollToBottom);

      return () => {
        window.removeEventListener("resize", handleScrollToBottom);
      };
    }
  }, [handleOpen, ref]);
};

export default useScrollToRef;
