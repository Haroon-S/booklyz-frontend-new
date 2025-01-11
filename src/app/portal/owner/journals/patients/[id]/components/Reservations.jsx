'use client';

import { useGetBookingsQuery } from '@/services/private/bookings'
import { AutoStoriesOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

function Reservations() {
    const { id } = useParams();

    const { data: previousBookingsData } = useGetBookingsQuery({ previous_date_booking: moment(new Date()).format('YYYY-MM-DD') })
    const { data: upcomingBookingsData } = useGetBookingsQuery({ upcoming_date_booking: moment(new Date()).format('YYYY-MM-DD') })

    return (
        <>
            <Grid container p={4} height="100%">
                <Grid item xl={6} lg={6} md={6} pr={4}>
                    <Box display="flex" gap={2}>

                        <AutoStoriesOutlined />

                        <Stack spacing={1}>
                            <Typography fontSize="24px" variant='h4'>
                                Previous bookings
                            </Typography>

                            <Typography variant='body1' fontSize="14px">
                                30 days back • <span style={{ color: '#50b8a7' }}> View all bookings </span>
                            </Typography>
                        </Stack>

                    </Box>

                    <Stack spacing={2} mt={2}>
                        {
                            previousBookingsData?.results?.length > 0 ? (
                                previousBookingsData.results.slice(0, 5).map(item => (
                                    <Box sx={{ borderRadius: '15px', backgroundColor: '#f5f6f8' }} key={item.id} padding={4} display="flex" justifyContent="space-between">

                                        <Stack>
                                            <Typography variant='body2' style={{ color: '#66737f' }}><b style={{ color: '#50b8a7' }}>{item?.user_first_name} {item?.user_last_name}</b> #{item.id} </Typography>
                                            <Typography variant='body2' style={{ color: '#66737f' }}>{moment(item.booking_date).format('DD MMM YYYY, HH:MM')}</Typography>
                                        </Stack>

                                        <Link href={`/portal/owner/journals/patients/${id}/journal/${item.id}/?tab=tab1`}>
                                            <Button variant='contained'>
                                                View draft
                                            </Button>
                                        </Link>

                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography>
                                        Data not found
                                    </Typography>
                                </Box>
                            )
                        }

                    </Stack>
                </Grid>
                <Grid item xl={6} lg={6} md={6} borderLeft={1} paddingLeft={4}>
                    <Box display="flex" gap={2}>

                        <AutoStoriesOutlined />

                        <Stack spacing={1}>
                            <Typography fontSize="24px" variant='h4'>
                                Upcoming bookings
                            </Typography>

                            <Typography variant='body1' fontSize="14px">
                                30 ahead • <span style={{ color: '#50b8a7' }}> View all bookings </span>
                            </Typography>
                        </Stack>

                    </Box>

                    <Stack spacing={2} mt={2}>
                        {
                            upcomingBookingsData?.results?.length > 0 ? (
                                upcomingBookingsData.results.slice(0, 5).map(item => (
                                    <Box sx={{ borderRadius: '15px', backgroundColor: '#f5f6f8' }} key={item.id} padding={4} display="flex" justifyContent="space-between">

                                        <Stack>
                                            <Typography variant='body2' style={{ color: '#66737f' }}><b style={{ color: '#50b8a7' }}>{item?.user_first_name} {item?.user_last_name}</b> #{item.id} </Typography>
                                            <Typography variant='body2' style={{ color: '#66737f' }}>{moment(item.booking_date).format('DD MMM YYYY, HH:MM')}</Typography>
                                        </Stack>

                                        <Link href={`/portal/owner/journals/patients/${id}/journal/${item.id}/?tab=tab1`}>
                                            <Button variant='contained'>
                                                Journal entry
                                            </Button>
                                        </Link>

                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography>
                                        Data not found
                                    </Typography>
                                </Box>
                            )
                        }

                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default Reservations
