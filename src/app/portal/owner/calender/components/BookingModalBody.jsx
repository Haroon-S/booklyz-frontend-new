import React from 'react';
import PropTypes from 'prop-types';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import moment from 'moment';

function BookingModalBody({ bookingData }) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Service Title:
        </Typography>
      </Grid2>
      <Grid2 xs={8}>
        <Typography variant="body1" className=" capitalize">
          {bookingData?.service_name || bookingData?.title}
        </Typography>
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Booking Status:
        </Typography>
      </Grid2>
      <Grid2 xs={8}>
        <Typography variant="body1" className=" capitalize">
          {bookingData?.booking_status}
        </Typography>
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Booking Date:
        </Typography>
      </Grid2>
      <Grid2 xs={8}>
        <Typography variant="body1" className=" capitalize">
          {moment(bookingData?.booking_date).format('DD MMM, YYYY')}
        </Typography>
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Timing:
        </Typography>
      </Grid2>
      <Grid2 xs={8}>
        <Typography variant="body1">
          {`${moment(bookingData?.start).format('hh:mm a')} - ${moment(bookingData?.end).format('hh:mm a')}`}
        </Typography>
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Client:
        </Typography>
      </Grid2>
      <Grid2 xs={8}>
        <Typography variant="body1">
          {`${bookingData?.user_first_name} ${bookingData?.user_last_name}`}
        </Typography>
      </Grid2>
      {bookingData?.booking_description && (
        <Grid2 xs={4}>
          <Typography variant="body1" className=" capitalize font-semibold">
            Description:
          </Typography>
        </Grid2>
      )}
      {bookingData?.booking_description && (
        <Grid2 xs={8}>
          <Typography variant="body1">{bookingData?.booking_description}</Typography>
        </Grid2>
      )}
    </Grid2>
  );
}

BookingModalBody.propTypes = {
  bookingData: PropTypes.object,
};

export default BookingModalBody;
