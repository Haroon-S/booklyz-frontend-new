'use client';

import React, { useMemo, useState } from 'react';
import { Box, Modal } from '@mui/material';
import moment from 'moment';
import Calendar from './components/Calendar';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import BookingModalBody from './components/BookingModalBody';
import { useGetCalenderBookingsQuery } from '@/services/private/calender';
import AddBookingModal from './components/AddBookingModal';
import CalenderFilterForm from './components/CalenderFilterForm';

function BookingCalender() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSlotModalOpen, setSlotModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState('');

  // API HOOKS & TRANSFORMER HOOKS
  const { data: calenderEvents } = useGetCalenderBookingsQuery({ profile: filters || undefined });

  const modifiedCalenderEvents = useMemo(() => {
    if (calenderEvents?.length > 0 && calenderEvents !== null) {
      return calenderEvents.map(booking => ({
        id: booking.id,
        title: booking.service__service_name || '',
        description: booking.booking_status,
        booking_status: booking.booking_status,
        user_first_name: booking.user__first_name,
        user_last_name: booking.user__last_name,
        start: moment(
          `${booking.booking_date} ${booking.start_booking_slot}`,
          'YYYY-MM-DD HH:mm:ss'
        ).toDate(),
        end: moment(`${booking.booking_date} ${booking.end_booking_slot}`, 'YYYY-MM-DD HH:mm:ss').toDate(),
        allDay: false,
        event_index: 2,
        priority: 'non',
      }));
    }

    return [];
  }, [calenderEvents]);

  // HANDLERS
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleSlotModal = () => {
    setSlotModalOpen(!isSlotModalOpen);
  };

  const handleSelectBooking = booking => {
    setSelected(booking);
    setModalOpen(true);
  };

  const handleSlotSelect = slotInfo => {
    setSlotModalOpen(true);
  };
  const handleFilter = newValue => {
    setFilters(newValue);
  };

  return (
    <Box className="bg-white p-4">
      <Box className=" py-6">
        <CalenderFilterForm filterHandler={handleFilter} />
      </Box>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={formModalStyles}>
          <ModalHeader title="Booking Details" onClose={toggleModal} />

          <BookingModalBody bookingData={selected} />
        </Box>
      </Modal>

      <Modal open={isSlotModalOpen} onClose={toggleSlotModal}>
        <Box sx={{ ...formModalStyles, width: '700px' }}>
          <ModalHeader title="Booking Details" onClose={toggleSlotModal} />

          <AddBookingModal toggleModalHandler={toggleSlotModal} bookingData={selected} />
        </Box>
      </Modal>

      <Calendar
        small={false}
        events={modifiedCalenderEvents}
        onSelectEvent={handleSelectBooking}
        onSelectSlot={handleSlotSelect}
      />
    </Box>
  );
}

export default BookingCalender;
