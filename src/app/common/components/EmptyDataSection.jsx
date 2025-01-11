import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import bookings from '@/assets/no-bookings1.svg';

function EmptyDataSection({
  title = 'No data found',
  subTitle = 'When data is added, it will appear here',
  redirect = '',
}) {
  return (
    <Box className=" pt-10 w-full flex justify-center items-center">
      <Box className=" flex flex-col justify-center items-center">
        <Image src={bookings.src} alt="Logo" width={300} height={300} />
        <Box className="flex flex-col justify-center items-center mt-6">
          <Typography variant="h5" className=" font-semibold">
            {title}
          </Typography>
          <Typography variant="body1" className=" font-normal mt-2">
            {subTitle}
          </Typography>
          {redirect && (
            <Link href={redirect}>
              <Button variant="contained" color="primary" className=" uppercase mt-5">
                Book A Service
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}

EmptyDataSection.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  redirect: PropTypes.string,
};

export default EmptyDataSection;
