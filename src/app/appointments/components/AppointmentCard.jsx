/* eslint-disable no-unused-vars */
import { ChevronRight, PinDropOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import dummyImage from '@/assets/dummyImage.png';

function AppointmentCard({ companyName = '', image = '', id = '', date = '', time = '', serviceName = '', status = '' }) {
  return (
    <Link className=" p-2 w-full flex flex-col gap-8 rounded-3xl shadow-xl border border-gray-200" href={`/appointments/${id}`}>
      <Box className=" flex justify-between cursor-pointer p-3">
        <Box className=" flex gap-5">
          <Avatar src={image} sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
          <Box className=" flex flex-col gap-1">
            <Chip label={status} color="success" size="small" className=" uppercase p-2 w-fit text-xs" />
            <Typography variant="body1" className=" text-lg font-semibold">
              {companyName}
            </Typography>
            <Typography variant="body1" className="text-sm font-medium text-grey">
              {date} {time}
            </Typography>
            <Typography variant="body1" className=" text-sm md:text-base font-medium text-grey">
              {serviceName}
            </Typography>
          </Box>
        </Box>
        <ChevronRight fontSize="small" />
      </Box>
    </Link>
  );
}

AppointmentCard.propTypes = {
  companyName: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  date: PropTypes.string,
  time: PropTypes.string,
  serviceName: PropTypes.string,
  status: PropTypes.string,
};

export default AppointmentCard;
