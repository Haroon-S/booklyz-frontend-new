import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import PageWrapper from './common/components/PageWrapper';
import { primary } from '@/styles/common/colors';
import image from '@/assets/home-banner2.JPG';
import icon from '@/assets/icons/check.svg';
import banner from '@/assets/home-section-banner4.jpeg';
import SubCategoriesCards from './components/SubCategoriesCards';
import GridItemCard from './payments/payment-plans/components/GridItemCard';

function Home() {
  return (
    <PageWrapper
      bgColor={primary}
      heading="More Time for Your Dreams,"
      heading2="All in One Place"
      imageSrc={image.src}
      showSearch
      showButton
    >
      <Box className="py-5 w-full">
        <Grid2 container justifyContent="center" spacing={4}>
          <Grid2 xs={12} md={4}>
            <GridItemCard image={icon} head="View and manage your bookings" isHome />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <GridItemCard image={icon} head="Add and manage favorites" isHome />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <GridItemCard image={icon} head="Save your details for a smoother booking experience" isHome />
          </Grid2>
        </Grid2>
      </Box>
      <Box className=" relative w-full h-[110px] md:h-[325px]">
        <Image src={banner} alt="banner" fill />
      </Box>
      <Box className=" mt-12">
        <Typography variant="h4" className=" text-center md:text-start">
          Book Service
        </Typography>
        <Typography variant="h6" fontWeight={500} className="text-center md:text-start mt-4">
          Welcome to Booklyz, Effortlessly discover and book top-quality services tailored to your needs. From
          beauty and wellness to medical consultations, our platform gathers trusted providers in one place,
          making it simple and quick to find the right service. Save time, skip the hassle, and experience the
          highest standards of care.
        </Typography>
        <SubCategoriesCards />
      </Box>
    </PageWrapper>
  );
}

export default Home;
