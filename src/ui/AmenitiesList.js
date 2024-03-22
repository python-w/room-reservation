import { useEffect, useRef, useState } from "react";
import Icon from "@mui/material/Icon";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import DiningOutlinedIcon from '@mui/icons-material/DiningOutlined'; import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import HvacOutlinedIcon from '@mui/icons-material/HvacOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import BalconyOutlinedIcon from '@mui/icons-material/BalconyOutlined';
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const amenityIcons = {
  "2 Double Beds": <BedOutlinedIcon />,
  "Dinner": <DiningOutlinedIcon />,
  "Swimming Pool": <PoolOutlinedIcon />,
  "Wifi": <WifiOutlinedIcon />,
  "Free Parking": <DirectionsCarFilledOutlinedIcon />,
  "TV": <TvOutlinedIcon />,
  "Air Conditioning": <AcUnitOutlinedIcon />,
  "Balcony": <BalconyOutlinedIcon />,
  "Heating": <HvacOutlinedIcon />,
  "Bathtub": <BathtubOutlinedIcon />,
  "Smoking": <SmokingRoomsOutlinedIcon />
};

export default function ListWithSummary({ items, maxWidth }) {
  const listRef = useRef(null);
  const [summarizedList, setSummarizedList] = useState([]);
  const [unSummarizedList, setUnSummarizedList] = useState([]);
  const [isSummarized, setIsSummarized] = useState(false);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const moreItems = useRef();

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
            setUnSummarizedList(unsummarized);
          }
        }
        const remainingCount = items.length - summarized.length;
        summarized.push({ label: `${remainingCount} more...`, icon: <AddOutlinedIcon />, lastSpan: true });
        setSummarizedList(summarized);
        setIsSummarized(true);
      }
    };

    if (!isSummarized) {
      summarizeList();
    }
  }, [items, maxWidth, isSummarized, summarizedList]);

  useOnClickOutside(moreItems, () => {
    setShowMoreItems(false)
  })

  return (
    <div ref={listRef} className="amenitiesList-inner">
      {summarizedList.map((summarizeitem, index) => (
        summarizeitem.lastSpan === true && index === summarizedList.length - 1 ?
          <span className="more_amenities_outer" key={index} data-index={index}>
            <button onClick={() => setShowMoreItems(show => !show)} className="badge badge-pill badge-light lbadge-light">{summarizeitem && summarizeitem.icon && <Icon>{summarizeitem.icon}</Icon>}{summarizeitem && summarizeitem.label}</button>
            {showMoreItems &&
              <ul className="more_amenities" ref={moreItems}>
                {unSummarizedList.map((unsummarizeitem, unsumindex) => (
                  <li key={unsumindex} data-index={unsumindex}>
                    {unsummarizeitem && unsummarizeitem}
                  </li>
                ))}
              </ul>
            }
          </span>
          :
          <span key={index} data-index={index} className="badge badge-pill badge-light lbadge-light">
            {summarizeitem in amenityIcons && amenityIcons[summarizeitem]}
            {summarizeitem}
          </span>
      ))}
    </div>
  );
}