'use client';

import { useGetAssetsQuery } from '@/services/private/assets';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react'

const TemplateModal = ({ toggle, openMarkerModal }) => {

    const { data: assetsTemplates } = useGetAssetsQuery({ template_type: 'image' });

    const handleImageSelect = imageUrl => {
        localStorage.setItem('template_image', imageUrl);

        toggle();
        openMarkerModal();
    }

    return (
        <>
            <Typography variant='h5' textAlign={'center'} mb={3}>
                Template Images
            </Typography>
            <Grid container spacing={2}>

                {
                    assetsTemplates?.results?.length > 0 ? (
                        assetsTemplates.results.map((item) => (
                            item?.image &&
                            (<Grid item xl={3} lg={3} display={'flex'} justifyContent={'center'}>
                                <Stack spacing={1} alignItems={'center'}>
                                    <img src={item?.image} style={{ maxWidth: '100%', cursor: 'pointer' }} onClick={() => handleImageSelect(item?.image)} />
                                    <Typography variant='body2'>
                                        Image
                                    </Typography>
                                </Stack>
                            </Grid>)
                        ))
                    ) : (
                        <Typography variant='h5' textAlign={'center'}>
                            No Data Found
                        </Typography>
                    )
                }
            </Grid>
        </>
    )
}

export default TemplateModal
