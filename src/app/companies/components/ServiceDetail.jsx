'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Check } from '@mui/icons-material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function ServiceDetail({ title = '', price = '', timing = '', id = null }) {
  const { id: paramsId } = useParams();
  return (
    <Box className=" flex flex-wrap gap-4 md:gap-0 justify-between items-center transition-all duration-300 cursor-pointer p-3">
      <Box className=" flex gap-4">
        <Check fontSize="small" className=" border rounded-full text-themeBorder" />
        <Box>
          <Typography variant="body1" className=" text-grey font-semibold">
            {title}
          </Typography>
          <Box className=" flex flex-wrap justify-between item-baseline gap-3">
            <Typography variant="body1" className=" text-grey font-semibold">
              {timing}min, DKK {price}
            </Typography>
            <Typography variant="body1" className=" text-sky-700 underline font-semibold">
              More Info
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:w-fit flex justify-end">
        <Link href={`/companies/${paramsId}/choose-time?serviceId=${id}`}>
          <Button variant="contained" className=" bg-dark">
            Continue
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

ServiceDetail.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  timing: PropTypes.string,
  id: PropTypes.number,
};

export default ServiceDetail;
