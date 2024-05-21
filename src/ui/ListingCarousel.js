import React, { useRef, useEffect, useState } from 'react';

import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';

import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import { TbPhoto } from 'react-icons/tb';

const defaults = {
  transition: "slide"
};

function Carousel({ children, showPageCount }) {
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const options = {
      ...defaults,
      infinite: false,
      Dots: false,
      Thumbs: false,
      on: {
        ready: (instance) => {
          setCurrentPage(instance.page + 1);
          setTotalPages(instance.pages.length);
        },
        change: (instance) => {
          setCurrentPage(instance.page + 1);
          setTotalPages(instance.pages.length);
        }
      },
    };

    const instance = new NativeCarousel(container, options);
    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <div className="f-carousel" ref={containerRef}>
      {children}
      {showPageCount && <PageCountDisplay currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}

function PageCountDisplay({ currentPage, totalPages }) {
  return (
    <div className='total-slides-count'>
      <TbPhoto className='react-icon' /> {currentPage} of {totalPages}
    </div>
  );
}

export default Carousel;
