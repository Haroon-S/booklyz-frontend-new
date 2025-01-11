'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import BookingCheckoutForm from './components/BookingCheckoutForm';

function BookingCheckout() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const companyId = searchParams.get('company');
  const date = searchParams.get('date');
  const startTime = searchParams.get('start_time');
  const endTime = searchParams.get('end_time');
  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <Typography variant="h5" className=" font-bold">
        Book
      </Typography>
      <BookingCheckoutForm serviceId={serviceId} companyId={companyId} date={date} startTime={startTime} endTime={endTime} />
    </Container>
  );
}

export default BookingCheckout;
