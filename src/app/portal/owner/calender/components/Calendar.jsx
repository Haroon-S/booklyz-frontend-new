'use client';

import React, { useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Box } from '@mui/material';
import { CalendarMonth, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { momentLocalizer, Calendar as ReactCalendar, Views } from 'react-big-calendar';
import CalendarEvent from './CalendarEvent';

// STYLES & UTILITIES
import '@/styles/components/calendar.scss';

function Calendar({ small, events, onSelectEvent, selectedEvent, eventStyles, onSelectSlot }) {
  const localizer = momentLocalizer(moment);
  const [view, setView] = useState(Views.MONTH)
  const [currentDate, setCurrentDate] = useState(new Date());
  const formats = {
    dayFormat: (date, culture) => localizer.format(date, 'DD', culture),
  };

  const onView = useCallback(newView => setView(newView), [setView])

  useEffect(() => {
    if (selectedEvent) {
      setCurrentDate(new Date(selectedEvent.start));
    }
  }, [selectedEvent]);

  const handleNavigate = newDate => {
    setCurrentDate(newDate);
  };

  return (
    <Box className={`calendarWrapper ${small ? 'smallCalendar' : ''}`}>
      <ReactCalendar
        localizer={localizer}
        events={events}
        onView={onView}
        view={view}
        views={[Views.MONTH, Views.DAY]}
        popup
        formats={formats}
        date={currentDate}
        onNavigate={handleNavigate}
        step={30} // Each timeslot is 30 minutes
        timeslots={1} // Two slots per hour (2 x 30 minutes = 60 minutes)
        showMultiDayTimes
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyles}
        messages={{
          previous: <ChevronLeft />,
          next: <ChevronRight />,
          today: <CalendarMonth />,
        }}
        components={{
          event: CalendarEvent,
        }}
      />
    </Box>
  );
}

Calendar.propTypes = {
  small: propTypes.bool,
  events: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      title: propTypes.string,
      allDay: propTypes.bool,
      start: propTypes.instanceOf(Date),
      end: propTypes.instanceOf(Date),
      priority: propTypes.string,
    })
  ).isRequired,
  selectedEvent: propTypes.object,
  onSelectEvent: propTypes.func,
  onSelectSlot: propTypes.func,
  eventStyles: propTypes.func,
};

export default Calendar;
