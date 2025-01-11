'use client';

import { Box, Stack } from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { loadScript } from '@paypal/paypal-js';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Checkout from './components/Checkout';

function CheckoutPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking');
  const serviceId = searchParams.get('service');
  const companyId = searchParams.get('company');

  const initialValues = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
    // intent: 'capture',
    // vault: true,
  };
  loadScript(initialValues)
    .then(() => {
      // console.log("Success")
    })
    .catch(() => {
      // console.log("Error")
    });

  return (
    <Box className=" flex justify-center items-center w-full h-screen">
      <PayPalScriptProvider options={initialValues}>
        <Stack direction="row" className=" w-full md:min-w-[365px]">
          <Checkout bookingId={bookingId} serviceId={serviceId} companyId={companyId} />
        </Stack>
      </PayPalScriptProvider>
    </Box>
  );
}

export default CheckoutPage;
