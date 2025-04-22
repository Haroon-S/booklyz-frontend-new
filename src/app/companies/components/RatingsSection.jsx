import PropTypes from 'prop-types';
import { Star } from '@mui/icons-material';
import { Box, LinearProgress, Rating, Typography } from '@mui/material';
import React from 'react';
import RatingProgress from '@/app/common/components/RatingProgress';

function RatingsSection({ ratingData }) {
  console.log('ratingData ==> ', ratingData);
  
  return (
    <Box className=" mt-8">
      <Box className=" flex gap-3">
        <Star style={{ color: '#F5CB3B', fontSize: '80px' }} />
        <Box>
          <Typography variant="h4" className=" font-bold">
            {ratingData?.rating} out of 5
          </Typography>
          <Typography variant="body2" className=" mt-2">
            Based on {ratingData?.total_ratings} ratings
          </Typography>
        </Box>
      </Box>
      <Box className=' w-full flex flex-col gap-6'>
        <Box className=" w-full flex items-center gap-4">
          <Box className=" w-full flex items-center gap-2">
            5
            <Rating value={5} readOnly />
            <Box className='w-full'>
              <RatingProgress value={ratingData?.five_star_percent} />
            </Box>
          </Box>
          <Typography variant="body1" className=" text-sky-500 underline text-nowrap">
            ({ratingData?.five_star})
          </Typography>
        </Box>
        <Box className=" w-full flex items-center gap-4">
          <Box className=" w-full flex items-center gap-2">
            4
            <Rating value={4} readOnly />
            <Box className='w-full'>
              <RatingProgress value={ratingData?.four_star_percent} />
            </Box>
          </Box>
          <Typography variant="body1" className=" text-sky-500 underline text-nowrap">
            ({ratingData?.four_star})
          </Typography>
        </Box>
        <Box className=" w-full flex items-center gap-4">
          <Box className=" w-full flex items-center gap-2">
            3
            <Rating value={3} readOnly />
            <Box className='w-full'>
              <RatingProgress value={ratingData?.three_star_percent} />
            </Box>
          </Box>
          <Typography variant="body1" className=" text-sky-500 underline text-nowrap">
            ({ratingData?.three_star})
          </Typography>
        </Box>
        <Box className=" w-full flex items-center gap-4">
          <Box className=" w-full flex items-center gap-2">
            2
            <Rating value={2} readOnly />
            <Box className='w-full'>
              <RatingProgress value={ratingData?.two_star_percent} />
            </Box>
          </Box>
          <Typography variant="body1" className=" text-sky-500 underline text-nowrap">
            ({ratingData?.two_star})
          </Typography>
        </Box>
        <Box className=" w-full flex items-center gap-4">
          <Box className=" w-full flex items-center gap-2">
            1
            <Rating value={1} readOnly />
            <Box className='w-full'>
              <RatingProgress value={ratingData?.one_star_percent} />
            </Box>
          </Box>
          <Typography variant="body1" className=" text-sky-500 underline text-nowrap">
            ({ratingData?.one_star})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

RatingsSection.propTypes = {
  ratingData: PropTypes.object,
};

export default RatingsSection;
