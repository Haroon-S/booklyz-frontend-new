/* eslint-disable no-unused-vars */

'use client';

import { useSnackbar } from 'notistack';
import React from 'react';
import PropTypes from 'prop-types';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import SectionLoader from '@/app/common/loaders/SectionLoader';
import { formatAmount } from '@/utilities/helpers';
import { useSendPaymentStatusMutation } from '@/services/private/paypal';
import { createPaymentCookie } from '@/utilities/cookiesHelpers';

const cardHeadingFont = { fontSize: 16 };
const planSummaryStyleBox = { justifyContent: 'space-between' };
const paymentCardHeadingStyle = { fontSize: 16, fontWeight: 600 };
function Checkout({ plan }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [{ isPending }] = usePayPalScriptReducer();

  const [sendPaymentStatus] = useSendPaymentStatusMutation();

  // const handleCreateSubscription = async (_, actions) => {
  //   const subscription = await actions.subscription.create({ plan_id: plan?.planId });
  //   return subscription;
  // };

  const handleOnApprove = async (data, actions) => {
    try {
      const captureOrder = await actions.order.capture();
      // CHECKING CHECKOUT TYPES

      const payload = {
        paypal_payment_id: captureOrder?.id,
        payment_for: 'subscription',
        subscription_id: plan?.id,
        amount: parseFloat(plan.subscription_price),
      };

      const response = await sendPaymentStatus(payload);
      if (response?.error) {
        enqueueSnackbar(response?.error?.data?.error || 'Something Went Wrong', { variant: 'error' });
        return;
      }
      enqueueSnackbar(response?.data?.message || 'Payment Made', { variant: 'success' });
      await createPaymentCookie(true);
      router.push('/portal/owner/dashboard');
    } catch (error) {
      enqueueSnackbar(error || 'Something Went Wrong', { variant: 'error' });
    }
  };

  const handleCreatePaypalOrder = async (data, actions) => {
    const createOrder = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: plan?.subscription_price,
            currency_code: 'USD',
          },
        },
      ],

      intent: 'CAPTURE',
    });
    return createOrder;
  };
  return isPending ? (
    <SectionLoader />
  ) : (
    <Card>
      <CardContent>
        <Stack sx={{ width: 400, maxHeight: 500, justifyContent: 'space-between' }}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Order Summary</Typography>
            <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 2 }}>
              <Typography sx={paymentCardHeadingStyle}>{plan?.subscription_name}</Typography>
              <Typography sx={paymentCardHeadingStyle}>
                $ {formatAmount(Number(plan?.subscription_price))}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ ...planSummaryStyleBox, marginBottom: 2 }}>
              <Typography sx={cardHeadingFont}>Duration Time</Typography>
              <Typography sx={paymentCardHeadingStyle}>{plan?.subscription_duration_days}</Typography>
            </Stack>
            <Box sx={{ height: '1px', backgroundColor: 'silver' }} />

            <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 2, marginBottom: 2 }}>
              <Typography sx={cardHeadingFont}>SubTotal</Typography>
              <Typography sx={paymentCardHeadingStyle}>
                $ {formatAmount(Number(plan?.subscription_price))}
              </Typography>
            </Stack>

            <Box sx={{ height: '1px', backgroundColor: 'silver' }} />

            <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 2, marginBottom: 2 }}>
              <Typography sx={paymentCardHeadingStyle}>Total</Typography>
              <Typography sx={paymentCardHeadingStyle}>
                $ {formatAmount(Number(plan?.subscription_price))}
              </Typography>
            </Stack>
            <Box sx={{ height: '1px', backgroundColor: 'silver' }} />
          </Box>

          {plan?.subscription_price && (
            <PayPalButtons
              fundingSource="paypal"
              style={{ height: 55 }}
              onCancel={() => {}}
              onError={() => {}}
              // createSubscription={handleCreateSubscription}
              createOrder={handleCreatePaypalOrder}
              onApprove={handleOnApprove}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

Checkout.propTypes = {
  plan: PropTypes.object.isRequired,
};

export default Checkout;
