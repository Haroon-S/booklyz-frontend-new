/* eslint-disable no-unused-vars */
import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  bookingFormInitVals,
  bookingFormValSchema,
  bookingOptions,
  paymentOptions,
} from '../../utilities/formUtils';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import FormikSelect from '@/shared/components/form/FormikSelect';
import { useUpdateBookingMutation } from '@/services/private/bookings';

function AddEditBookingForm({ bookingData = null, toggleAddModal }) {
  const [initValues, setInitValues] = useState(bookingFormInitVals);

  const [updateBooking, { error: editError, isSuccess: isEditSuccess }] = useUpdateBookingMutation();
  useHandleApiResponse(editError, isEditSuccess, 'Booking updated successfully!');

  useEffect(() => {
    if (bookingData) {
      setInitValues({
        id: bookingData?.id,
        booking_status: bookingData?.booking_status,
        payment_status: bookingData?.payment_status ? 'Paid' : 'UnPaid',
      });
    }
  }, [bookingData]);

  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={bookingFormValSchema}
        onSubmit={async values => {
          if (bookingData) {
            await updateBooking({ ...values, payment_status: values?.payment_status === 'Paid' });
          }
          toggleAddModal();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Grid2 columnSpacing={6} spacing={3} container>
              <Grid2 container alignItems="start" rowSpacing={4} xs={12} md={6}>
                <Stack spacing={1} width="100%" marginRight={1}>
                  <FormikSelect
                    name="booking_status"
                    label="Booking Status"
                    isRequired
                    placeholder="Select Status"
                    options={bookingOptions}
                    isStack
                    isPortal
                  />
                </Stack>
              </Grid2>
              <Grid2 container alignItems="start" rowSpacing={4} xs={12} md={6}>
                <Stack spacing={1} width="100%" marginLeft={1}>
                  <FormikSelect
                    name="payment_status"
                    label="Payment Status"
                    isRequired
                    placeholder="Payment Status"
                    options={paymentOptions}
                    isStack
                    isPortal
                  />
                </Stack>
              </Grid2>
            </Grid2>

            <Box className="flex w-100 items-end justify-end gap-3" mt={4}>
              <SubmitBtn label="Update" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

AddEditBookingForm.propTypes = {
  bookingData: PropTypes.object,
  toggleAddModal: PropTypes.func,
};

export default AddEditBookingForm;
