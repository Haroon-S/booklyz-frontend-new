/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Star } from '@mui/icons-material';

function StaffItemGrid({ name = '', rating = '', image = '', id = null }) {
  return (
    <Box className=" hover:bg-sky-100 flex justify-between items-center transition-all duration-300 cursor-pointer p-3">
      <Box className=" flex items-center gap-3">
        <Avatar src="" sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
        <Box className=" flex justify-between items-center gap-3">
          <Typography variant="h6" className=" font-semibold">
            {rating}
          </Typography>
          <Star />
          <Typography variant="h6" className=" font-semibold">
            {name}
          </Typography>
        </Box>
      </Box>
      {/* <Box>
        <Button variant="contained" className=" bg-dark">
          Select
        </Button>
      </Box> */}
    </Box>
  );
}

StaffItemGrid.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
};

export default StaffItemGrid;
