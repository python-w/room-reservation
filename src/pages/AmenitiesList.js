import React, { useRef, useEffect, useState } from "react";

export default function ListWithSummary({ items, maxWidth }) {
  const listRef = useRef(null);
  const [summarizedList, setSummarizedList] = useState([]);

  useEffect(() => {
    const calculateWidth = () => {
      const spans = Array.from(listRef.current.children);
      return spans.reduce((totalWidth, span) => {
        const spanStyles = window.getComputedStyle(span);
        const spanWidth = span.offsetWidth + parseFloat(spanStyles.marginLeft) + parseFloat(spanStyles.marginRight) + 20;
        return totalWidth + spanWidth;
      }, 0);
    };

    const summarizeList = () => {
      const totalWidth = calculateWidth();
      if (totalWidth <= maxWidth) {
        setSummarizedList(items);
      } else {
        const summarized = [];
        const unsummarized = [];
        let currentWidth = 0;
        for (const span of listRef.current.children) {
          const spanStyles = window.getComputedStyle(span);
          const spanWidth = span.offsetWidth + parseFloat(spanStyles.marginLeft) + parseFloat(spanStyles.marginRight) + 20;
          if (currentWidth + spanWidth <= maxWidth) {
            summarized.push(items[Number(span.getAttribute("data-index"))]);
            currentWidth += spanWidth;
          } else {
            unsummarized.push(items[Number(span.getAttribute("data-index"))]);
          }
        }
        const remainingCount = items.length - summarized.length;
        summarized.push(`${remainingCount} more...`);
        setSummarizedList(summarized);
      }
    };

    summarizeList();
  }, [items, maxWidth]);

  return (
    <div ref={listRef} className="amenitiesList-inner">
      {summarizedList.map((item, index) => (
        <span key={index} data-index={index} className="badge badge-pill badge-light lbadge-light">
          {item}
        </span>
      ))}
    </div>
  );
}
