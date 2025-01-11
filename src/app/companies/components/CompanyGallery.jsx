/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import dummyImage from '@/assets/dummyImage.png';

function CompanyGallery({ images = [] }) {
  return (
    <Box className=" mt-6 flex flex-wrap gap-3">
      {images?.map(image => (
        <Box className=" relative w-full aspect-square md:w-64 md:h-64">
          <Image
            src={image?.image || dummyImage.src}
            alt="Company Image"
            className="object-cover rounded-2xl shadow-lg"
            fill
          />
        </Box>
      ))}
    </Box>
  );
}

CompanyGallery.propTypes = {
  images: PropTypes.array,
};

export default CompanyGallery;
