import React from 'react';
import PropTypes from 'prop-types';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Divider, Typography } from '@mui/material';
import moment from 'moment';

function JournalDetail({ journalData }) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Name
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-end" xs={8}>
        <Typography variant="body1" className=" capitalize">
          {journalData?.name}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Divider sx={{ borderColor: '#e3e3e3' }} />
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Phone
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-end" xs={8}>
        <Typography variant="body1" className=" capitalize">
          {journalData?.phone}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Divider sx={{ borderColor: '#e3e3e3' }} />
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Email
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-end" xs={8}>
        <Typography variant="body1" className=" capitalize">
          {journalData?.email}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Divider sx={{ borderColor: '#e3e3e3' }} />
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Price
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-end" xs={8}>
        <Typography variant="body1" className=" capitalize">
          {journalData?.price}kr
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Divider sx={{ borderColor: '#e3e3e3' }} />
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Created At
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-end" xs={8}>
        <Typography variant="body1">{moment(journalData?.created_at).format('DD MMM, YYYY')}</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Divider sx={{ borderColor: '#e3e3e3' }} />
      </Grid2>
      <Grid2 xs={4}>
        <Typography variant="body1" className=" capitalize font-semibold">
          Company Description
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-end" xs={8}>
        <Typography variant="body1">{journalData?.description}</Typography>
      </Grid2>
    </Grid2>
  );
}

JournalDetail.propTypes = {
  journalData: PropTypes.object,
};

export default JournalDetail;
