'use client';

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Chip, Container, Divider, Modal, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  AccessTime,
  CalendarMonthOutlined,
  CancelOutlined,
  ChevronRight,
  FeedbackOutlined,
  Payment,
  Wallet,
} from '@mui/icons-material';
import Link from 'next/link';
import moment from 'moment';
import {
  useAddFeedbackMutation,
  useGetBookingQuery,
  useUpdateBookingMutation,
} from '@/services/private/bookings';
import { border } from '@/styles/common/colors';
import ModalHeader from '@/app/common/components/ModalHeader';
import FeedbackForm from '../components/FeedbackForm';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import SectionLoader from '@/app/common/loaders/SectionLoader';

function BookingDetail({ params }) {
  const [modalOpen, setModalOpen] = useState(false);

  // API HOOKS
  const { data, isLoading, isFetching } = useGetBookingQuery(params?.id);
  const [addFeedback, { error, isSuccess }] = useAddFeedbackMutation();
  const [updateBookingStatus, { error: statusError, isSuccess: statusSuccess }] = useUpdateBookingMutation();

  // HANDLERS
  const toggleModal = () => setModalOpen(prev => !prev);

  const handleBookingCancel = async () => {
    await updateBookingStatus({ booking_status: 'Cancelled', id: params?.id });
  };

  // SNACKBAR HOOKS
  useHandleApiResponse(error, isSuccess, 'Feedback Added successfully!');
  useHandleApiResponse(statusError, statusSuccess, 'Booking Cancelled successfully!');

  return (
    <Container variant="portal" sx={{ marginTop: '70px !important' }}>
      <Typography variant="h5" className=" font-bold">
        Booking Detail
      </Typography>
      <Grid2 className=" flex justify-center" container columnSpacing={{ xs: 0, md: 10 }} mt={5}>
        <Grid2 xs={12} md={6}>
          <Stack gap={6} className="w-full">
            <Box className=" p-8 w-full flex flex-col gap-8 rounded-3xl shadow-xl border border-gray-200">
              {(isLoading || isFetching) && (
                <Box className="w-full h-full flex justify-center items-center">
                  <SectionLoader />
                </Box>
              )}
              {!(isLoading || isFetching) && (
                <>
                  <Box className=" flex justify-between cursor-pointer p-3">
                    <Box className=" flex gap-5">
                      <Avatar
                        src={`https://server.booklyz.com${data?.company_image}`}
                        sx={{ borderRadius: '10px', width: '56px', height: '56px' }}
                      />
                      <Box className=" flex flex-col gap-1">
                        <Chip label={data?.booking_status} color="success" size="small" className=" uppercase p-2 w-fit text-xs" />
                        <Typography variant="body1" className=" text-lg font-semibold">
                          {data?.company_name}
                        </Typography>
                        <Typography variant="body1" className="text-sm font-medium text-grey">
                          {moment(data?.booking_date).format('dddd, MMMM DD')} at{' '}
                          {moment(data?.start_booking_slot, 'HH:mm:ss').format('hh:mm a')} -{' '}
                          {moment(data?.end_booking_slot, 'HH:mm:ss').format('hh:mm a')}
                        </Typography>
                      </Box>
                    </Box>
                    {/* <ChevronRight fontSize="small" /> */}
                  </Box>
                  <Box className="flex flex-col gap-3">
                    <Box className=" flex justify-between">
                      <Box className="flex flex-col gap-1">
                        <Typography variant="body1" className=" text-base font-medium text-grey">
                          {data?.service_name}
                        </Typography>
                        <Typography variant="body1" className=" text-base font-medium text-grey">
                          {data?.service_timing}min
                        </Typography>
                      </Box>
                      <Typography variant="body1" className=" text-base font-medium">
                        {data?.total_price}
                      </Typography>
                    </Box>
                    <Divider sx={{ borderColor: border }} />
                    <Box className=" flex justify-between">
                      <Typography variant="body1" className=" text-lg font-semibold">
                        Total
                      </Typography>
                      <Typography variant="body1" className=" text-lg font-semibold">
                        {data?.total_price}
                      </Typography>
                    </Box>
                    {data?.payment_type === 'on_the_spot' ? (
                      <Box className=" mt-3 w-full flex gap-3 items-center">
                        <Wallet style={{ fontSize: '48px' }} />
                        <Box className=" w-full">
                          <Typography variant="body1" className=" text-lg font-semibold">
                            Pay at venue
                          </Typography>
                          <Typography variant="body1" className=" text-sm text-grey font-semibold">
                            Payment methods cash
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box className=" mt-3 w-full flex gap-3 items-center">
                        <Payment style={{ fontSize: '48px' }} />
                        <Box className=" w-full">
                          <Typography variant="body1" className=" text-lg font-semibold">
                            Pay Online
                          </Typography>
                          <Typography variant="body1" className=" text-sm text-grey font-semibold">
                            Payment through Paypal
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Stack>
        </Grid2>
        <Grid2 className=" mt-10 md:mt-0" xs={12} md={6} xxl={3}>
          <Stack>
            <Box className=" p-5 w-full flex flex-col gap-4 rounded-3xl shadow-xl border border-gray-200">
              {(data?.booking_status === 'Completed' || data?.booking_status === 'Cancelled') && (
                <Link
                  href={{
                    pathname: `/companies/${data?.company_id}/choose-time`,
                    query: { serviceId: data?.service },
                  }}
                >
                  <Button className=" flex gap-2 w-full" variant="contained" color="primary">
                    <CalendarMonthOutlined fontSize="small" /> Book Again
                  </Button>
                </Link>
              )}
              {data?.booking_status === 'Completed' && (
                <Button
                  onClick={toggleModal}
                  className=" flex gap-2 w-full bg-dark hover:bg-darker text-white"
                  variant="contained"
                >
                  <FeedbackOutlined fontSize="small" /> Add Feedback
                </Button>
              )}
              {data?.booking_status !== 'Completed' && data?.booking_status !== 'Cancelled' && (
                <>
                  <Link href={`/appointments/change-time-slot/${data?.id}`}>
                    <Button className=" flex gap-2 w-full" variant="contained" color="primary">
                      <AccessTime fontSize="small" /> Change Slot
                    </Button>
                  </Link>
                  <Button
                    onClick={handleBookingCancel}
                    className=" flex gap-2 w-full bg-dark hover:bg-darker text-white"
                    variant="contained"
                  >
                    <CancelOutlined fontSize="small" /> Cancel
                  </Button>
                </>
              )}
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      <Modal open={modalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, padding: '20px' }}>
          <ModalHeader title="Feedback" onClose={toggleModal} />
          <FeedbackForm service={data?.service} toggleModal={toggleModal} handler={addFeedback} />
        </Box>
      </Modal>
    </Container>
  );
}

BookingDetail.propTypes = {
  params: PropTypes.object,
};

export default BookingDetail;
