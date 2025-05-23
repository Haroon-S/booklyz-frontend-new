import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { primary } from '@/styles/common/colors';
import SignInForm from './components/SignInForm';
import backgroundImage from '@/assets/auth-banner3.webp';
import logo from '@/assets/Booklyz.svg';

function SignIn() {
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
        className=" relative bg-white h-screen md:h-full md:rounded-2xl flex justify-center items-center"
      >
        <Box sx={{ paddingX: { xs: '0px', md: '60px' }, maxWidth: '650px' }}>
          <Box className="w-full flex justify-center py-7">
            <Link href="/">
              <Image src={logo} alt="Logo" height={150} width={150} />
            </Link>
          </Box>
          <Box sx={{ padding: '10px' }} className="mb-lg-4 mb-md-3">
            <Typography variant="h5" sx={{ color: primary }} className="mb-1 text-center font-bold ">
              Shape Your New Account
            </Typography>
          </Box>
          <SignInForm />
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

export default SignIn;
