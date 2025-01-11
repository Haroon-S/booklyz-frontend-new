/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ReviewCard from './ReviewCard';

function RatingAndReviews({ ratings = [] }) {
  return (
    <Box className="mt-6">
      {ratings?.length > 0 && (
        <Grid2 container spacing={3}>
          {ratings?.map(item => (
            <Grid2 xs={12} md={6}>
              <ReviewCard reviewData={item} />
            </Grid2>
          ))}
        </Grid2>
      )}
      {ratings?.length === 0 && (
        <Box>
          <Typography variant="h6" className=" font-medium my-4">No Reviews Found</Typography>
        </Box>
      )}
    </Box>
  );
}

RatingAndReviews.propTypes = {
  ratings: PropTypes.object,
};

export default RatingAndReviews;
