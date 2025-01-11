/* eslint-disable no-unused-vars */
import { PinDropOutlined } from '@mui/icons-material';
import { Avatar, Box, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import dummyImage from '@/assets/dummyImage.png';

function CompanyCards({ title = '', images = '', id = '', description = '', address = '', rating = [] }) {
  return (
    <Link href={`/companies/${id}`}>
      <Box
        className=" flex flex-col overflow-hidden md:flex-row gap-5 shadow-md border rounded-xl my-5"
      >
        <Image
          src={images?.length > 0 ? images[0].image : dummyImage.src}
          alt="Logo"
          width={348}
          height={200}
          className="min-h-[200px] max-h-[200px] object-cover"
        />
        <Box className=" py-5 md:py-3 px-5 md:px-0">
          <Typography variant="h5" className=" font-semibold">
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <Avatar
              src={images?.length > 0 ? images[0].image : ''}
              className=" shadow-md rounded-xl w-16 h-16"
            />
            <Box sx={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <PinDropOutlined />
                <Typography variant="body1" className=" font-medium">
                  {address}
                </Typography>
              </Box>
              {rating?.length > 0 ? (
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <Typography variant="body1" className=" font-medium">
                    {rating[0]?.rating}
                  </Typography>
                  <Rating value={rating[0]?.rating} readOnly />
                </Box>
              ) : (
                <Rating value={0} readOnly disabled />
              )}
            </Box>
          </Box>
          <Box sx={{ marginTop: '16px' }}>
            <Typography variant="body1" className="font-bold text-grey">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

CompanyCards.propTypes = {
  title: PropTypes.string,
  images: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  rating: PropTypes.array,
  id: PropTypes.number,
};

export default CompanyCards;
