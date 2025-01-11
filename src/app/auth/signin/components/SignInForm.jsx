/* eslint-disable no-unused-vars */

'use client';

import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

// API & CUSTOM HOOKS
import { onLoggedIn } from '@/store/slices/authSlice';
import { useLoginMutation } from '@/services/public/auth';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';

// COMPONENTS & UTILITIES
import FormikField from '@/shared/components/form/login/FormikField';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import { initialValues, validationSchema } from '../utilities/formUtils';
import { createPaymentCookie, createTokenCookie } from '@/utilities/cookiesHelpers';

function SignInForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signIn, { error, isSuccess }] = useLoginMutation();
  useHandleApiResponse(error, isSuccess, 'Logged In Successfully!');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        const signInResp = await signIn({ ...values, email: values?.email?.toLowerCase() });
        if (signInResp?.data) {
          await createTokenCookie(signInResp?.data);
          await createPaymentCookie(signInResp?.data);
          dispatch(onLoggedIn(signInResp?.data));

          if (signInResp?.data?.user?.user_type === 'owner') {
            if (signInResp?.data?.is_payment_verified) {
              router.push('/portal/owner/dashboard');
            } else {
              router.push('/payments/payment-plans');
            }
          } else {
            router.push('/');
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className=" flex flex-col items-center justify-center w-full px-6 sm:px-0">
          <Grid justifyContent="center" alignItems="center" columnSpacing={2} rowGap={2} container>
            <Grid item xs={12}>
              <FormikField type="text" name="email" placeholder="Enter your email" />
            </Grid>
            <Grid item xs={12}>
              <FormikField type="password" name="password" placeholder="Enter your password" />
            </Grid>
          </Grid>
          <Grid justifyContent="center" alignItems="center" columnSpacing={2} rowGap={2} container>
            <Grid item xs={12}>
              <Box className=" flex flex-col items-end">
                <Link
                  href="/auth/forgot-password"
                  className=" text-blue-600 hover:text-gray-600  mb-4 underline"
                >
                  Forgot Password?
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className=" flex flex-col items-center">
                <Typography
                  className="flex mb-1"
                  sx={{ fontSize: { xs: '14px', md: '16px' }, color: 'black', fontWeight: { xs: '500', md: '600' } }}
                >
                  {'Don\'t have an account?'}
                  <Link href="/auth/signup" className=" text-blue-600 mx-2 mb-0 underline">
                    Register Now!
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <SubmitBtn label="Sign in" className="my-3 normal-case" isLoading={isSubmitting} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
