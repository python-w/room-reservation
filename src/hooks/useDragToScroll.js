import React, { useState, useRef, useEffect } from 'react';

function useDragToScroll() {
  const divRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - divRef.current.offsetLeft);
    setScrollLeft(divRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - divRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    divRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {divRef, isDragging, handleMouseDown, handleMouseMove, handleMouseUp};
}

export default useDragToScroll;