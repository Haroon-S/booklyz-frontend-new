import { Box, Typography } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import backgroundImage from '@/assets/auth-banner3.webp';
import logo from '@/assets/Booklyz.svg';
import { primary } from '@/styles/common/colors';
import ForgetPasswordForm from './components/ForgetPasswordForm';

function ForgetPassword() {
  return (
    <Box
      className=" flex justify-center items-center"
      sx={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: '-100px',
        backgroundColor: '#e9e9e7',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{ paddingBottom: '60px' }}
        className=" relative bg-white h-full rounded-2xl flex justify-center"
      >
        <Box sx={{ paddingX: '60px', maxWidth: '650px' }}>
          <Box className="w-full flex justify-center py-7">
            <Link href="/">
              <Image src={logo} alt="Logo" height={150} width={150} />
            </Link>
          </Box>
          <Box sx={{ padding: '10px' }} className="mb-lg-4 mb-md-3">
            <Typography variant="h5" sx={{ color: primary }} className="mb-1 text-center font-bold ">
              Forgot Password
            </Typography>
            <Typography variant="h6" className="my-2 text-center">
              Enter your email to reset your password
            </Typography>
          </Box>
          <ForgetPasswordForm />
        </Box>
        <Typography variant="body2" color="grey" sx={{ position: 'absolute', bottom: '10px' }}>
          Powered by{' '}
          <a
            href="https://codesetsolutions.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'grey', fontSize: 'inherit' }}
          >
            {' '}
            Code Set Solutions&#169; 2024
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default ForgetPassword;
