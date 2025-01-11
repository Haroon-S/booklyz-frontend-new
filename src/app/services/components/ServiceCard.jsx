import { PinDropOutlined } from '@mui/icons-material';
import { Box, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import categoryImage from '@/assets/category-img.webp';

function ServiceCard() {
  return (
    <Link href="/">
      <Box className=" shadow-lg rounded-xl" sx={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
        <Image src={categoryImage.src} alt="categoryImage" width={400} height={400} />
        <Box>
          <Typography variant="h5" className=" font-semibold">
            Service Name
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <Image src={categoryImage.src} className=" shadow-md rounded-xl" alt="Logo" width={100} height={100} />
            <Box sx={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <PinDropOutlined />
                <Typography variant="body1" className=" font-medium">Service Name</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Typography variant="body1" className=" font-medium">4</Typography>
                <Rating value={4} readOnly />
              </Box>
              <Typography variant="body1" className=" font-medium">Address</Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: '16px' }}>
            <Typography variant="body1" className="font-bold text-grey">Description</Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default ServiceCard;
