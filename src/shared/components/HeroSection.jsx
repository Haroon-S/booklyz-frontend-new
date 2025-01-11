/* eslint-disable react/no-array-index-key */
/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CommonFilterForm from '@/app/common/components/CommonFilterForm';

function HeroSection({ heading = '', heading2 = '', Description = '', imageSrc = '', showSearch = false, height = '400px' }) {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        backgroundImage: `url(${imageSrc})`,
        marginTop: '70px',
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          height,
          backgroundColor: 'black',
          position: 'absolute',
          opacity: 0.3,
          width: '100%',
          top: 0,
        }}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%', position: 'absolute', zIndex: 50 }}
      >
        <Grid item xs={11} md={6}>
          <Box className="w-full flex flex-col justify-center items-center">
            <Typography
              variant="h1"
              color="white"
              className=" text-center mb-[10px] font-semibold"
            >
              {heading}
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className=" text-center mb-[10px] font-semibold"
            >
              {heading2}
            </Typography>
          </Box>
          <Typography variant="h6" lineHeight="27px" color="white" sx={{ textAlign: 'center' }}>
            {Description}
          </Typography>
          {showSearch && (
            <Box my={3} className="flex justify-center items-center gap-2 w-full">
              <CommonFilterForm />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

HeroSection.propTypes = {
  heading: PropTypes.string.isRequired,
  heading2: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
};

export default HeroSection;
