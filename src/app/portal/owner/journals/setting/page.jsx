'use client';

import { ChevronRight } from '@mui/icons-material';
import { Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function SettingPage() {

    const { palette: { primary: { main } } } = useTheme();


    // common Stylings
    const commonPaperStyles = {
        borderRadius: '10px',
    }

    return (
        <div style={{ width: '100%' }}>
            <Paper sx={{ ...commonPaperStyles, minHeight: 'calc(100vh - 160px)' }} className=" py-14 px-8">
                <Grid container>

                    <Grid item xl={5} lg={5} md={6} sm={12}>
                        <Stack spacing={4}>
                            <Paper className='p-4'>
                                <Typography variant='h5'>
                                    Text and journal entry templates
                                </Typography>
                                <Typography variant='body2' mb={2}>
                                    Create text templates and copy into journals if necessary.
                                </Typography>

                                <Link href="/portal/owner/journals/setting/manage-templates" style={{ color: main, }} className='flex align-items-center'>
                                    Manage Templates <ChevronRight style={{ color: main }} />
                                </Link>
                            </Paper>

                            <Paper className='p-4'>
                                <Typography variant='h5'>
                                    Image templates
                                </Typography>
                                <Typography variant='body2' mb={2}>
                                    Use generic image templates in the anatomical map.
                                </Typography>

                                <Link href="/portal/owner/journals/setting/manage-images" style={{ color: main, }} className='flex align-items-center'>
                                    Manage Images <ChevronRight style={{ color: main }} />
                                </Link>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default SettingPage
