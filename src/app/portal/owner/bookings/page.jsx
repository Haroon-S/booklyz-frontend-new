'use client';

import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import BookingTable from './components/table/BookingTable';

function Bookings() {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="pageTitle">Bookings</Typography>
      </Stack>
      <Paper sx={{ borderRadius: '10px' }} className=" py-14 px-8">
        <BookingTable />
      </Paper>
    </>
  );
}

export default Bookings;
