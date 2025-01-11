'use client';

import { useGetBookingsQuery } from '@/services/private/bookings';
import { useGetJournalsQuery } from '@/services/private/journals';
import { Box, Button, Grid, List, ListItem, Modal, Paper, Stack, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import propTypes from 'prop-types';
import React from 'react';

function Journals({ searchParams }) {

  const { id } = useParams();

  const { data: journalsListData } = useGetJournalsQuery({});
  const { data: bookingsData } = useGetBookingsQuery();


  const today = moment().format("YYYY-MM-DD");

  // Filter records based on today's date
  const filteredRecords = bookingsData?.results?.filter(record => moment(record.date).isSame(today, 'day'));

  console.log('bookingsData  ==> ', bookingsData)

  console.log('journalsListData ==> ', journalsListData)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={12}>
          <Paper sx={{ borderRadius: '20px', padding: '20px 30px', minHeight: 'calc(100vh - 160px)' }}>
            <Typography variant='h5'>
              Your latest journal drafts
            </Typography>

            <Stack spacing={1} mt={3}>

              {
                journalsListData?.results?.length > 0 ? (
                  journalsListData?.results?.map(item => (
<Box sx={{ borderRadius: '15px', backgroundColor: '#f5f6f8' }} padding={4} display="flex" justifyContent="space-between">

                    <Stack>
                      <Typography variant='body2' style={{ color: '#66737f' }}><b style={{ color: '#50b8a7' }}>{item?.contact_name}</b> #805509 </Typography>
                      <Typography variant='body2' style={{ color: '#66737f' }}>{moment(item?.date).format('DD MMM YYYY')}</Typography>
                    </Stack>

                    <Button variant='contained'>
                      View draft
                    </Button>

</Box>
))
                ) : (
                  <Typography variant='h3'>
                    No data found
                  </Typography>
                )
              }

            </Stack>
          </Paper>
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <Stack spacing={2}>

            <Paper sx={{ borderRadius: '20px', padding: '20px 30px', minHeight: 'calc(50vh - 95px)' }}>
              <Typography variant='h5'>
                Notices
              </Typography>

            </Paper>

            <Paper sx={{ borderRadius: '20px', padding: '20px 30px', minHeight: 'calc(50vh - 80px)' }}>
              <Typography variant='h5'>
                Bookings
              </Typography>
              <Stack spacing={1} mt={3}>

                {
                  filteredRecords?.length > 0 ? (
                    filteredRecords?.slice(0, 3)?.map(item => (
<Box sx={{ borderRadius: '15px', backgroundColor: '#f5f6f8' }} padding={4} display="flex" justifyContent="space-between">

                      <Stack>
                        <Typography variant='body2' style={{ color: '#66737f' }}><b style={{ color: '#50b8a7' }}>{item?.contact_name}</b> #805509 </Typography>
                        <Typography variant='body2' style={{ color: '#66737f' }}>{moment(item?.date).format('DD MMM YYYY')}</Typography>
                      </Stack>

                      <Link href={`/portal/owner/journals/patients/${id}/journal/${item.id}/?tab=tab1`}>
                        <Button variant='contained'>
                          Journal entry
                        </Button>
                      </Link>
                      {/* <Button variant='contained'>
                        Jounal entry
                      </Button> */}

</Box>
))
                  ) : (
                    <Typography variant='h3'>
                      No data found
                    </Typography>
                  )
                }

              </Stack>
            </Paper>
          </Stack>
        </Grid>

      </Grid>
    </>
  );
}

Journals.propTypes = {
  searchParams: propTypes.object,
};

export default Journals;
