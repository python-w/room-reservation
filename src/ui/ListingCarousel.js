import React, { useRef, useEffect, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

const defaults = {
  transition: "slide"
};

function Carousel(props) {
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const options = {
      ...defaults,
      ...(props.options || {}),
      on: {
        ready: (instance) => {
          setCurrentPage(instance.page + 1);
          setTotalPages(instance.pages.length);
        },
        change: (instance) => {
          setCurrentPage(instance.page + 1);
          setTotalPages(instance.pages.length);
          // console.log(page+'/'+pages)
        }
      },
    };

    const instance = new NativeCarousel(container, options, { Thumbs });
    return () => {
      instance.destroy();
    };
  }, [props.options]);

  return (
    <div className="f-carousel" ref={containerRef}>
      {props.children}
      {props.showPageCount && <PageCountDisplay currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}

function PageCountDisplay({ currentPage, totalPages }) {
  return (
    <div className='total-slides-count'>
      <ImageOutlinedIcon /> {currentPage} of {totalPages}
    </div>
  );
}

export default Carousel;
