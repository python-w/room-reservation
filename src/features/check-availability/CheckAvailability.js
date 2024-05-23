
import React, { useRef, useState } from "react";
import { format, isWithinInterval } from 'date-fns';
import { Dialog, Fade } from "@material-ui/core";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import useDragToScroll from "../../hooks/useDragToScroll";

export default function CheckAvailability({ open, handleClose }) {
    const { divRef, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDragToScroll();
    const [currentDate, setCurrentDate] = useState(new Date());
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderMonthTitle = () => {
        const today = new Date();
        const isFirstMonth = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();

        return (
            <div className="month_title">
                {!isFirstMonth && <button onClick={handlePrevMonth}><TbChevronLeft className="react-icon" /></button>}
                <h3>{format(currentDate, 'MMMM yyyy')}</h3>
                <button onClick={handleNextMonth}><TbChevronRight className="react-icon" /></button>
            </div>
        );
    };

    const renderCalendar = () => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = (monthEnd.getDate() - monthStart.getDate()) + 1;
        const calendarDays = [];


        for (let i = 0; i < daysInMonth; i++) {
            const currentDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() + i);
            calendarDays.push(
                <div key={i} className='day'>
                    <span>{format(currentDate, 'EEE')}</span> <span>{format(currentDate, 'MMM dd')}</span>
                </div>
            );
        }

        return calendarDays;
    };

    const reservations = {
        "Room411": [
            { startDate: "2024-03-01", endDate: "2024-03-10" },
            { startDate: "2024-03-15", endDate: "2024-03-20" }
        ],
        "Room412": [
            { startDate: "2024-04-01", endDate: "2024-04-10" },
            { startDate: "2024-04-15", endDate: "2024-04-20" }
        ],
    };
    const renderRoomCalendar = (room) => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = (monthEnd.getDate() - monthStart.getDate()) + 1;
        const calendarDays = [];

        let consecutiveAvailableCount = 0;
        let consecutiveNotAvailableCount = 0;
        let keyIndex = 0;

        for (let i = 0; i < daysInMonth; i++) {
            const currentDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() + i);
            let available = true;

            reservations[room].forEach(({ startDate, endDate }) => {
                const start = new Date(startDate);
                const end = new Date(endDate);
                if (isWithinInterval(currentDate, { start, end })) {
                    available = false;
                }
            });

            if (available) {
                consecutiveAvailableCount++;
            } else {
                if (consecutiveAvailableCount > 0) {
                    calendarDays.push(
                        <div key={`available-${keyIndex}`} className="available-days d-flex">
                            {Array.from({ length: consecutiveAvailableCount }, (_, index) => (
                                <span key={index} className="day">Available</span>
                            ))}
                        </div>
                    );
                    consecutiveAvailableCount = 0;
                    keyIndex++;
                }
                consecutiveNotAvailableCount++;
                if (consecutiveNotAvailableCount > 0) {
                    calendarDays.push(
                        <div key={`not-available-${keyIndex}`} className="notavailable-days d-flex">
                            {Array.from({ length: consecutiveNotAvailableCount }, (_, index) => (
                                <span key={index} className="day">Not Available</span>
                            ))}
                        </div>
                    );
                    consecutiveNotAvailableCount = 0;
                    keyIndex++;
                }
            }

        }

        // Push the remaining consecutive available days
        if (consecutiveAvailableCount > 0) {
            calendarDays.push(
                <div key={`available-${keyIndex}`} className="available-days d-flex">
                    {Array.from({ length: consecutiveAvailableCount }, (_, index) => (
                        <span key={index} className="day">Available</span>
                    ))}
                </div>
            );
            keyIndex++;
        }
        // Push the remaining consecutive available days
        if (consecutiveNotAvailableCount > 0) {
            calendarDays.push(
                <div key={`not-available-${keyIndex}`} className="not-available-days d-flex">
                    {Array.from({ length: consecutiveNotAvailableCount }, (_, index) => (
                        <span key={index} className="day">Not Available</span>
                    ))}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <>
            <Dialog
                className="mui_dialog check_availability"
                open={open}
                onClose={handleClose}
                scroll='body'
                fullWidth={true}
                maxWidth="lg"
                aria-labelledby="check availability"
                TransitionComponent={Fade}
            >
                <div className='modal_dialog'>
                    <div className="modal_header">
                        <h2>Check Availability</h2>
                        {renderMonthTitle()}
                    </div>
                    <div className="modal_body">
                        <div className="room_sidebar">
                            <p><strong>Rooms</strong></p>
                            <div className="room_listing">
                                <p><strong>Accessibility</strong></p>
                                <ul>
                                    <li>
                                        <img src="https://lipsum.app/id/73/100x100" loading="lazy" alt="" width={48} height={48} />
                                        <span>Room # 411</span>
                                    </li>
                                    <li>
                                        <img src="https://lipsum.app/id/61/100x100" loading="lazy" alt="" width={48} height={48} />
                                        <span>Room # 412</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            ref={divRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                            className="room_aside"
                        >
                            <div className="month_calendar check_availability_calendar">
                                {renderCalendar()}
                            </div>
                            <div className="calendar_outer">
                                <div className="check_availability_calendar">
                                    {renderRoomCalendar("Room411")}
                                </div>
                                <div className="check_availability_calendar">
                                    {renderRoomCalendar("Room412")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}
