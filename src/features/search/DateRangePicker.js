import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Box, Button, Typography } from "@material-ui/core";
import { useSearch } from "../../contexts/SearchContext";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function StyledDateRangePicker({ handleCloseModal, calendarRef, dateModalOpen }) {
  const { isTabletSMScreen } = useWindowWidth();
  const refDateModal = useRef();
  const { state, dispatch } = useSearch();
  const { selectedRange } = state;

  const today = new Date();
  const minSelectableDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const handleDateChange = (item) => {
    dispatch({ type: "DATE_RANGE", payload: item });
  };

  useOnClickOutside(refDateModal, () => {
    handleCloseModal()
  });

  return (
    <>
      <Box ref={refDateModal} className="inline_modal">
        <div className="room_card_header">
          <p>
            <strong>Select Dates</strong>
          </p>
        </div>
        <Box className="inline_modal_body" ref={calendarRef}>
          <DateRangePicker staticRanges={[]} inputRanges={[]}  minDate={minSelectableDate} onChange={handleDateChange} showSelectionPreview={false} moveRangeOnFirstSelection={false} months={isTabletSMScreen ? 1 : 2} ranges={selectedRange} direction="horizontal" showMonthAndYearPickers={false} dateDisplayFormat="E, MMM d" showDateDisplay={false} />
        </Box>
        <Box className="inline_modal_footer">
          <button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
        </Box>
      </Box>
    </>
  );
}
