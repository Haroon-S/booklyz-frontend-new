import { Avatar, Box, Rating, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

function ReviewCard({ reviewData }) {
  return (
    <Box className=" p-5 rounded-2xl bg-skin">
      <Box className=" flex items-center gap-3">
        <Avatar src="" sx={{ borderRadius: '10px', width: '40px', height: '40px' }} />
        <Box className=" flex flex-col gap-1">
          <Typography variant="body2" className=" capitalize font-semibold">
            {reviewData?.user_first_name} {reviewData?.user_last_name}
          </Typography>
          <Typography variant="body2" className=" text-grey font-semibold">
            {moment(reviewData?.created_at).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box className=" flex gap-2 my-4">
        <Rating value={reviewData?.rating} readOnly />
      </Box>
      <Box>
        <Typography variant="body2" className=" text-grey font-semibold">
          {reviewData?.feedback}
        </Typography>
      </Box>
    </Box>
  );
}

ReviewCard.propTypes = {
  reviewData: PropTypes.object.isRequired,
};

export default ReviewCard;
