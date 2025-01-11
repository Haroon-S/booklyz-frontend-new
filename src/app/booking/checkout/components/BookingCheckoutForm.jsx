/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Info, Payment, Wallet } from '@mui/icons-material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import dummyImage from '@/assets/dummyImage.png';
import { slotFormInitVals, slotFormValSchema } from '@/app/companies/[id]/choose-time/components/data';
import FormikField from '@/shared/components/form/FormikField';
import { bookingFormInitVals, bookingFormValSchema } from '../utilities/formUtils';
import { border } from '@/styles/common/colors';
import {
  useGetPublicCompanyByIdQuery,
  useGetPublicServiceByIdQuery,
} from '@/services/public/companyServices';
import { useAddBookingStatusMutation } from '@/services/private/paypal';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';

function RadioLabel({ text, subText, icon }) {
  return (
    <Box className=" w-full flex gap-3 items-center">
      {icon}
      <Box className=" w-full">
        <Typography variant="h6" className=" font-semibold">
          {text}
        </Typography>
        <Typography variant="body1" className=" text-sm md:text-base text-grey font-semibold">
          {subText}
        </Typography>
      </Box>
    </Box>
  );
}

function BookingCheckoutForm({ serviceId, date, startTime, endTime, companyId }) {
  const { user } = useSelector(state => state.auth);

  const router = useRouter();

  const { data: companyData } = useGetPublicCompanyByIdQuery(companyId);
  const { data: serviceData } = useGetPublicServiceByIdQuery(serviceId);

  const [addBooking, { error, isSuccess }] = useAddBookingStatusMutation();
  useHandleApiResponse(error, isSuccess, 'Booking added successfully!');

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={bookingFormInitVals}
        validationSchema={bookingFormValSchema}
        onSubmit={async values => {
          const payload = {
            ...values,
            booking_date: date,
            start_booking_slot: startTime,
            end_booking_slot: endTime,
            total_price: serviceData?.price,
            service: serviceId,
            user: user?.profile?.id,
          };

          const resp = await addBooking(payload);

          if (!resp?.error) {
            if (values?.payment_type === 'on_the_spot') {
              router.push('/appointments');
            } else {
              router.push(
                `/booking/check-out?service=${serviceId}&company=${companyId}&booking=${resp?.data?.id}`
              );
            }
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => (
          <Form>
            <Grid2 className=" flex justify-center" container columnSpacing={{ xs: 0, md: 10 }} mt={5}>
              <Grid2 xs={12} md={6}>
                <Stack gap={6} className="w-full">
                  <Box className=" p-8 w-full flex flex-col gap-8 rounded-3xl shadow-xl border border-gray-200">
                    <Box className="flex flex-col gap-3">
                      <Typography variant="h6" className=" font-bold">
                        My contact details
                      </Typography>
                      <FormikField
                        className=" border-t-0 border-r-0 border-l-0 rounded-none"
                        name="phone"
                        label="Phone"
                        isRequired
                        type="text"
                        placeholder="phone"
                        isStack
                      />
                    </Box>
                    <Box className="flex flex-col gap-3">
                      <Typography variant="h6" className=" font-bold">
                        Additional booking information
                      </Typography>
                      <FormikField
                        className=" border-t-0 border-r-0 border-l-0 rounded-none"
                        name="booking_description"
                        label="Description"
                        isRequired
                        type="textarea"
                        placeholder="Write a message to the business"
                        rows={7}
                        isStack
                      />
                    </Box>
                  </Box>
                  <Box className=" p-8 w-full flex flex-col gap-8 rounded-3xl shadow-xl border border-gray-200">
                    <Typography variant="h6" className=" font-bold">
                      Choose payment method
                    </Typography>
                    <Box className=" w-full flex flex-col gap-3">
                      <FormControl className=" w-full">
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="payment_type"
                          onChange={e => setFieldValue('payment_type', e.target.value)}
                          className=" w-full flex flex-col gap-4"
                        >
                          <Box className=" w-full flex items-center">
                            <FormControlLabel
                              value="online_payment"
                              sx={{
                                backgroundColor:
                                  values?.payment_type === 'online_payment' ? '#f3f4f6' : 'white',
                              }}
                              className=" hover:bg-gray-100 w-full rounded-xl py-3"
                              control={<Radio />}
                              label={(
                                <RadioLabel
                                  text="Pay Online"
                                  subText="Payment through Paypal"
                                  icon={<Payment style={{ fontSize: '48px' }} />}
                                />
                              )}
                            />
                          </Box>

                          <Box className=" w-full flex items-center">
                            <FormControlLabel
                              value="on_the_spot"
                              sx={{
                                backgroundColor: values?.payment_type === 'on_the_spot' ? '#f3f4f6' : 'white',
                              }}
                              className=" hover:bg-gray-100 w-full rounded-xl py-3"
                              control={<Radio />}
                              label={(
                                <RadioLabel
                                  text="Pay at venue"
                                  subText="Payment methods cash"
                                  icon={<Wallet style={{ fontSize: '48px' }} />}
                                />
                              )}
                            />
                          </Box>
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Box>
                </Stack>
                <Box className="flex w-full items-end justify-center gap-3" mt={4}>
                  <SubmitBtn
                    label="Complete Booking"
                    isLoading={isSubmitting}
                    className="rounded-xl py-3 w-full text-lg font-semibold"
                  />
                </Box>
              </Grid2>
              <Grid2 className=" mt-10 md:mt-0" xs={12} md={6} xxl={3}>
                <Stack>
                  <Box className=" p-8 w-full flex flex-col gap-8 rounded-3xl shadow-xl border border-gray-200">
                    <Box className=" flex gap-2">
                      <Avatar
                        src={
                          companyData?.company_images?.length > 0
                            ? companyData?.company_images[0].src
                            : dummyImage.src
                        }
                        sx={{ borderRadius: '10px', width: '56px', height: '56px' }}
                      />
                      <Box>
                        <Typography variant="body1" className=" font-semibold">
                          {companyData?.name}
                        </Typography>
                        <Typography variant="body1" className=" text-grey font-semibold">
                          {moment(date).format('DD MMM YYYY')},{' '}
                        </Typography>
                        <Typography variant="body2" className=" text-grey font-semibold">
                          {`${moment(startTime, 'HH:mm:ss').format('hh:mm a')} to ${moment(endTime, 'HH:mm:ss').format('hh:mm a')}`}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: border }} />

                    <Box className=" flex gap-2 justify-between">
                      <Box>
                        <Typography variant="body1" className=" text-grey font-semibold">
                          {serviceData?.service_name}
                        </Typography>
                        <Typography variant="body2" className=" text-grey font-semibold mt-1">
                          {serviceData?.service_timing} min
                        </Typography>
                      </Box>
                      <Typography variant="body1" className="font-semibold">
                        {serviceData?.price} kr
                      </Typography>
                    </Box>

                    <Divider sx={{ borderColor: border }} />

                    <Box className=" flex flex-col gap-2">
                      <Box className=" flex gap-2 justify-between">
                        <Typography variant="body1" className=" text-grey font-semibold">
                          Price
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {serviceData?.price} kr
                        </Typography>
                      </Box>
                      <Box className=" flex gap-2 justify-between">
                        <Typography variant="body1" className=" text-grey font-semibold">
                          Pay Today
                        </Typography>
                        <Typography variant="body1" className="font-medium">
                          {values?.payment_type === 'online_payment' ? serviceData?.price : 0} kr
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

BookingCheckoutForm.propTypes = {
  serviceId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  companyId: PropTypes.number.isRequired,
};

export default BookingCheckoutForm;
