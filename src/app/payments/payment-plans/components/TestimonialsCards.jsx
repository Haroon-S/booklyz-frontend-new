import { Avatar, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function TestimonialsCards({ feedback = '', name = '', avatar = '', designation = '' }) {
  return (
    <Box className=" flex flex-col justify-between bg-white p-4 min-h-80">
      <Typography variant="body3" className=" italic">&quot;{feedback}&quot;</Typography>
      <Box className=" mt-10 flex items-center gap-4">
        <Avatar src={avatar} />
        <Box>
          <Typography variant="h6" className=" font-semibold">
            {name}
          </Typography>
          <Typography variant="body2" className=" text-grey">
            {designation}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

TestimonialsCards.propTypes = {
  feedback: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  designation: PropTypes.string,
};

export default TestimonialsCards;
