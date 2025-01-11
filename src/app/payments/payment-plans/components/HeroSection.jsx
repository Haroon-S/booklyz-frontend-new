/* eslint-disable no-unused-vars */

import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import heroImage from '@/assets/business-page/image1.jpg';

function HeroSection() {
  return (
    <Box
      className=" w-full py-10 px-5 flex justify-center items-center"
      sx={{
        height: '500px',
        backgroundColor: '#001a33',
        backgroundImage: 'linear-gradient(180deg,#001a33,#273746)',
      }}
    >
      <Box className=" flex justify-between items-center w-full max-w-[1024px]">
        <Box className=" max-w-[480px]">
          <Typography variant="body2" className=" uppercase text-center md:text-start text-white tracking-wide ">
            BOOKLYZ booking system
          </Typography>
          <Typography variant="h1" className=" text-center md:text-start text-white normal-case my-2 font-semibold">
            More time for your dream
          </Typography>
          <Typography variant="body2" className=" text-center md:text-start text-white leading-6 tracking-wide">
            Online booking system with everything you need to run a business on Bulgaria largest marketplace for
            beauty and health. Save time and focus on what you are passionate about.
          </Typography>
          <Box className=" mt-4 flex gap-4 items-stretch w-full">
            <Link href="/" className=" w-full">
              <Button
                variant="contained"
                color="secondary"
                className=" bg-white font-normal py-3 text-sm w-full md:w-44"
              >
                To Booklyz
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className=" w-[350px] h-[350px] hidden md:block relative">
          <Image src={heroImage} alt="hero-image" className=" object-cover rounded-t-full" fill />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
