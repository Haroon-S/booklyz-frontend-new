"use client";

import { useGetBookingsQuery } from '@/services/private/bookings';
import { useGetPatientsQuery } from '@/services/private/patients';
import { useGetUserQuery } from '@/services/private/users';
import { BadgeOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

function Overview() {

    const { id } = useParams();
    const { data: userData } = useGetUserQuery({ user: id });

    const { social_security_number, email, mobile, user, address, username } = userData?.[0] || {};

    return (
        <Grid container>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Stack spacing={1} p={4}>
                    <Box display="flex" alignItems="center" gap={2} borderBottom="1px solid #e7ecf2" paddingY={2}>
                        <BadgeOutlined />  <Typography variant='h5' fontWeight={400} fontSize="24px">{username?.toUpperCase()}</Typography>
                    </Box>
                    <DataRow label="Social Security Number" value={social_security_number} />
                    <DataRow label="E-mail" value={email} />
                    <DataRow label="Mobile" value={mobile} />
                    <DataRow label="Id" value={user} />
                    <DataRow label="Address" value={address} />

                </Stack>
                {/* <Button variant='contained' color='secondary' sx={{ marginLeft: 4 }}>
                    Download from booking system
                </Button> */}
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} borderLeft={1} p={4}>

                <Typography variant='h4'>
                    Journals entries
                </Typography>

                <Box display="flex" gap={2} mt={2}>
                    <Link href={`/portal/owner/journals/patients/${id}/journal?tab=tab1`}>
                        <Button variant='contained' color='secondary'>
                            Show latest
                        </Button>
                    </Link>
                    <Link href={`/portal/owner/journals/patients/${id}/journal?tab=tab1`}>
                        <Button variant='contained' color='secondary'>
                            Create new
                        </Button>
                    </Link>
                </Box>


                <Typography variant='h4' mt={4}>
                    Form
                </Typography>

                <Box display="flex" gap={2} mt={2}>
                    <Button variant='contained' color='secondary'>
                        Show
                    </Button>
                    <Button variant='contained' color='secondary'>
                        Fill in
                    </Button>
                </Box>

            </Grid>
        </Grid>
    )
}

export default Overview;


function DataRow({ label, value }) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #e7ecf2" paddingY={1}>
            <Typography variant='body1' fontWeight={600}>
                {label}
            </Typography>
            <Typography variant='body1'>
                {value}
            </Typography>
        </Box>
    )
}