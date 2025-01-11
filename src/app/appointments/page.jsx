'use client';

/* eslint-disable no-unused-vars */
import { Box, Button, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import bookings from '@/assets/no-bookings1.svg';
import EmptyDataSection from '../common/components/EmptyDataSection';
import SectionLoader from '../common/loaders/SectionLoader';
import { useGetBookingsQuery } from '@/services/private/bookings';
import AppointmentCard from './components/AppointmentCard';
import { border } from '@/styles/common/colors';
import TabPanel from '@/shared/components/TabPanel';

function Appointments() {
  const [activeTab, setActiveTab] = useState(0);
  const {
    data: upcomingBookings,
    isLoading,
    isFetching,
  } = useGetBookingsQuery(
    { upcoming_date_booking: moment().format('YYYY-MM-DD') },
    { skip: activeTab !== 0 }
  );
  const {
    data: completedBookings,
    isLoading: completedBookingsIsLoading,
    isFetching: completedBookingsIsFetching,
  } = useGetBookingsQuery(
    { previous_date_booking: moment().format('YYYY-MM-DD') },
    { skip: activeTab !== 1 }
  );
  const loading = isLoading || isFetching;

  const completedBookingsLoading = completedBookingsIsLoading || completedBookingsIsFetching;

  // HANDLERS
  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container sx={{ marginTop: '70px !important', maxWidth: { xs: '100%', md: '768px !important' } }}>
      <Box>
        <Box className=" w-full flex items-center justify-center">
          <Tabs className="gap-32" value={activeTab} onChange={handleTabChange}>
            <Tab wrapped label="Upcoming" className=" text-base normal-case mx-4 md:mx-8" />

            <Tab wrapped label="Completed" className=" text-base normal-case mx-4 md:mx-8" />
          </Tabs>
        </Box>
        <TabPanel stateValue={activeTab} index={0}>
          <Divider sx={{ borderColor: border, marginBottom: 3 }} />
          <Box className=" flex flex-col gap-10">
            {loading && <SectionLoader />}
            {!loading &&
              upcomingBookings?.results?.length > 0 &&
              upcomingBookings?.results?.map(item => (
                <AppointmentCard
                  id={item?.id}
                  companyName={item?.company_name}
                  serviceName={item?.service_name}
                  status={item?.booking_status}
                  date={moment(item?.booking_date).format('ddd, DD MMMM')}
                  time={`${moment(item?.start_booking_slot, 'HH:mm:ss').format('hh:mm a')} - ${moment(item?.end_booking_slot, 'HH:mm:ss').format('hh:mm a')}`}
                  image={`https://server.booklyz.com${item?.company_image}`}
                />
              ))}
            {!loading && upcomingBookings?.results?.length === 0 && (
              <EmptyDataSection
                title="No services booked"
                subTitle="When you have booked a service, it will appear here"
                redirect="/"
              />
            )}
          </Box>
        </TabPanel>
        <TabPanel stateValue={activeTab} index={1}>
          <Divider sx={{ borderColor: border, marginBottom: 3 }} />
          <Box className=" flex flex-col gap-10">
            {completedBookingsLoading && <SectionLoader />}
            {!completedBookingsLoading &&
              completedBookings?.results?.length > 0 &&
              completedBookings?.results?.map(item => (
                <AppointmentCard
                  id={item?.id}
                  companyName={item?.company_name}
                  serviceName={item?.service_name}
                  status={item?.booking_status}
                  date={moment(item?.booking_date).format('ddd, DD MMMM')}
                  time={`${moment(item?.start_booking_slot, 'HH:mm:ss').format('hh:mm a')} - ${moment(item?.end_booking_slot, 'HH:mm:ss').format('hh:mm a')}`}
                  image={item?.company_image}
                />
              ))}
            {!completedBookingsLoading && completedBookings?.results?.length === 0 && (
              <EmptyDataSection
                title="No services booked"
                subTitle="When you have booked a service, it will appear here"
                redirect="/"
              />
            )}
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
}

export default Appointments;
