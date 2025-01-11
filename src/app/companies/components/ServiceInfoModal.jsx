import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

function ServiceInfoModal({ serviceData = '' }) {
  return (
    <Box className=" p-3">
      <Typography variant="body1">{serviceData}</Typography>
    </Box>
  );
}

ServiceInfoModal.propTypes = {
  serviceData: PropTypes.string,
};

export default ServiceInfoModal;
