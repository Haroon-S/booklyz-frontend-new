import { Box, LinearProgress, linearProgressClasses, styled } from '@mui/material';
import React from 'react';
import propTypes from 'prop-types';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#F5CB3B',
  },
}));

function RatingProgress({ value }) {
  return (
    <Box className=' w-full' sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={value} />
    </Box>
  );
}

RatingProgress.propTypes = {
  value: propTypes.number,
};

export default RatingProgress;
