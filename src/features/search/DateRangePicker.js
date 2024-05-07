import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Box, Button, Typography } from "@material-ui/core";
import { useSearch } from "../../contexts/SearchContext";
import { useCallback, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import useWindowWidth from "../../hooks/useWindowWidth";
import useScrollToRef from "../../hooks/ScrollToRef";

export default function StyledDateRangePicker({ handleCloseModal }) {
  const { isTabletSMScreen } = useWindowWidth();
  const refDateModal = useRef(null);
  const calendarRef = useRef(null);
  useScrollToRef(refDateModal, calendarRef);

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

  const combinedRef = useCallback(node => {
    if (node !== null) {
      refDateModal.current = node;
      calendarRef.current = node;
    }
}, [calendarRef]);


  return (
    <>
      <Box ref={combinedRef} className="inline_modal">
        <div className="room_card_header">
          <p>
            <strong>Select Dates</strong>
          </p>
        </div>
        <Box className="inline_modal_body">
          <DateRangePicker staticRanges={[]} inputRanges={[]}  minDate={minSelectableDate} onChange={handleDateChange} showSelectionPreview={false} moveRangeOnFirstSelection={false} months={isTabletSMScreen ? 1 : 2} ranges={selectedRange} direction="horizontal" showMonthAndYearPickers={false} dateDisplayFormat="E, MMM d" showDateDisplay={false} />
        </Box>
        <Box className="inline_modal_footer">
          <button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
        </Box>
      </Box>
    </>
  );
}
