/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import React from 'react';

function AboutBusiness({ about = '' }) {
  return (
    <Box mt={8}>
      <Typography variant="h3" className=" font-bold">
        About the business
      </Typography>
      <Box className="mt-6">
        <Typography variant="h6" className="font-semibold">
          {about}
        </Typography>
      </Box>
    </Box>
  );
}

AboutBusiness.propTypes = {
  about: PropTypes.string,
};

export default AboutBusiness;
