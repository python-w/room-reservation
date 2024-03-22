import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Box, Button, Typography } from "@mui/material";
import { useSearch } from "../../contexts/SearchContext";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export default function StyledDateRangePicker() {
  const refDateModal = useRef();
  const { state, dispatch } = useSearch();
  const { selectedRange } = state;

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handleDateChange = (item) => {
    dispatch({ type: "DATE_RANGE", payload: item });
  };

  useOnClickOutside(refDateModal, () => {
    dispatch({ type: "CLOSE_MODAL" });
  });

  return (
    <>
      <Box ref={refDateModal} className="inline_modal">
        <Typography variant="p" component="strong" className="rdrcalendar-header">
          Select Dates
        </Typography>
        <Box className="inline_modal_body">
          <DateRangePicker staticRanges={[]} inputRanges={[]} onChange={handleDateChange} showSelectionPreview={false} moveRangeOnFirstSelection={false} months={2} ranges={selectedRange} direction="horizontal" showMonthAndYearPickers={false} dateDisplayFormat="E, MMM d" showDateDisplay={false} />
        </Box>
        <Box className="inline_modal_footer">
          <Button onClick={handleClose}>Done</Button>
        </Box>
      </Box>
    </>
  );
}
