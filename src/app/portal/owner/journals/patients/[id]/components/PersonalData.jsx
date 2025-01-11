'use client';

import { useAuthorizedQuery } from '@/services/private/auth';
import { useGetOwnersQuery } from '@/services/private/journals';
import { useGetUserQuery } from '@/services/private/users';
import { BadgeOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { useParams } from 'next/navigation';
import React from 'react'

function PersonalData() {

    const { id } = useParams();

    const { data: meUserData } = useAuthorizedQuery();
    const { data: userProfileData } = useGetOwnersQuery({ user: id })

    const { social_security_number, family, email, mobile, id: userId, zip_code, address } = userProfileData?.[0] || {};

    return (
        <Grid container>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Stack spacing={1} p={4}>
                    <Box display="flex" justifyContent="space-between" borderBottom="1px solid #e7ecf2" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2} paddingY={2}>
                            <BadgeOutlined />  <Typography variant='h5' fontWeight={400} fontSize="24px">Journal entries</Typography>
                        </Box>

                        {/* <Button size='small' variant='contained'>
                            Change
                        </Button> */}
                    </Box>

                    <DataRow label="Social security number " value={social_security_number} />
                    <DataRow label="Relative" value={family} />

                </Stack>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} borderLeft={1} p={4}>

                <Box display="flex" alignItems="center" gap={2} paddingY={2}>
                    <BadgeOutlined />  <Typography variant='h5' fontWeight={400} fontSize="24px">User</Typography>
                </Box>
                <Typography variant='body2'>Users who made the patient their own. (Has access to personal data and journal) </Typography>

                <Box display="flex" gap={2} mt={2} px={2} py={1} alignItems="center" bgcolor="#f5f6f8">
                    <Avatar>{meUserData?.username?.[0]}</Avatar> <Typography variant='body1' fontSize="18px">{meUserData?.username}</Typography>
                </Box>

                <Divider />

                <Box display="flex" alignItems="center" gap={2} paddingTop={2}>
                    <BadgeOutlined />  <Typography variant='h5' fontWeight={400} fontSize="24px">Other information</Typography>
                </Box>

                <Box mt={2} px={2} py={1} alignItems="center" bgcolor="#f5f6f8">
                    <LabelValue label="E-Post" value={email} />
                    <LabelValue label="Mobile" value={mobile} />
                    <LabelValue label="Id" value={userId} />
                    <LabelValue label="Postal code" value={zip_code} />
                    <LabelValue label="Address" value={address} />
                </Box>

            </Grid>
        </Grid>
    )
}

export default PersonalData;


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

function LabelValue({ label, value }) {
    return (
        <Box display="flex" gap={1} alignItems="center" paddingY={1}>
            <Typography variant='body1' fontWeight={600}>
                {label}:
            </Typography>
            <Typography variant='body1'>
                {value}
            </Typography>
        </Box>
    )
}