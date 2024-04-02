import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Box, Button, Typography } from "@mui/material";
import { useSearch } from "../../contexts/SearchContext";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function StyledDateRangePicker({ handleCloseModal }) {
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
        <Typography variant="p" component="strong" className="rdrcalendar-header">
          Select Dates
        </Typography>
        <Box className="inline_modal_body">
          <DateRangePicker staticRanges={[]} inputRanges={[]} minDate={minSelectableDate} onChange={handleDateChange} showSelectionPreview={false} moveRangeOnFirstSelection={false} months={isTabletSMScreen ? 1 : 2} ranges={selectedRange} direction="horizontal" showMonthAndYearPickers={false} dateDisplayFormat="E, MMM d" showDateDisplay={false} />
        </Box>
        <Box className="inline_modal_footer">
          <Button onClick={handleCloseModal}>Done</Button>
        </Box>
      </Box>
    </>
  );
}
