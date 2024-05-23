import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Box, Button, Typography } from "@material-ui/core";
import { useSearch } from "../../contexts/SearchContext";
import { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import useWindowWidth from "../../hooks/useWindowWidth";
import useScrollToRef from "../../hooks/ScrollToRef";
import { differenceInDays } from "date-fns";
import AlertDialog from "../../ui/AlertDialog";
import { Alert, AlertTitle } from "@material-ui/lab";


export default function StyledDateRangePicker({ handleCloseModal, dateRange, setDateRange, minDate }) {
  const { isTabletSMScreen } = useWindowWidth();
  const refDateModal = useRef(null);
  const calendarRef = useRef(null);
  useScrollToRef(refDateModal, calendarRef);

  const { state, dispatch } = useSearch();
  const { numberOfNights } = state;

  const [isNightsExceed, setIsNightsExceed] = useState(true)

  const handleDateChange = (item) => {
    const numberOfNights = differenceInDays(item.selection.endDate, item.selection.startDate);
    if (numberOfNights > 30) {
      setIsNightsExceed(true)
    } else {
      setDateRange(item.selection)
      dispatch({ type: "DATE_RANGE", payload: item.selection });
    }
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
      <AlertDialog
        isShow={isNightsExceed}        
        severity="warning"
        alertTitle="Warning"
        alertmsg={`No. of nights are exceeding the limit, more than ${numberOfNights} nights are not allowed.`}
        handleClose={() => setIsNightsExceed(false)} />
      <Box ref={combinedRef} className="inline_modal">
        <div className="room_card_header">
          <p>
            <strong>Select Dates</strong>
          </p>
        </div>
        <Box className="inline_modal_body">
          <DateRangePicker
            minDate={minDate}
            onChange={handleDateChange}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false} months={isTabletSMScreen ? 1 : 2} ranges={[dateRange]} direction="horizontal" showMonthAndYearPickers={false} dateDisplayFormat="E, MMM d" showDateDisplay={false} />
        </Box>
        <Box className="inline_modal_footer">
          <button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
        </Box>
      </Box>
    </>
  );
}
