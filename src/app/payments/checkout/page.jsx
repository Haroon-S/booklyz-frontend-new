'use client';

import React from 'react';
import { Box, Stack } from '@mui/material';
import { loadScript } from '@paypal/paypal-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useSearchParams } from 'next/navigation';
import Checkout from '../components/Checkout';
import { useGetPaypalPlansListByIdQuery } from '@/services/private/paypal';
// utilities and components

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

function PayPalPaymentPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan_id');
  const { data } = useGetPaypalPlansListByIdQuery(planId);
  return (
    <Box className=" flex justify-center items-center w-full h-screen">
      <PayPalScriptProvider options={initialValues}>
        <Stack direction="row" minWidth="365px">
          <Checkout plan={data} />
        </Stack>
      </PayPalScriptProvider>
    </Box>
  );
}

export default PayPalPaymentPage;
