import { Box, Typography } from '@mui/material';
import propTypes from 'prop-types';
import React from 'react';

function CalendarEvent({ event }) {
  return (
    <Box>
      <Box>
        <Typography variant="body3" className="fw-bolder">
          {event.title}
        </Typography>
      </Box>

      <Box style={{ whiteSpace: 'pre-wrap' }}>
        <Typography variant="body3" sx={{ fontSize: '80%' }}>
          {event.description}
        </Typography>
      </Box>
    </Box>
  );
}

CalendarEvent.propTypes = {
  event: propTypes.object.isRequired,
};

export default CalendarEvent;
