/* eslint-disable max-len */
import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ArticleOutlined, CreditCard, CurrencyExchange, NoteAdd, RequestQuote, SavedSearchOutlined, SpatialAudioOutlined } from '@mui/icons-material';
import HeroSection from './components/HeroSection';
import PlanCardsContainer from './components/PlanCardsContainer';
import GridItemCard from './components/GridItemCard';
import AboutUs from './components/AboutUs';
import FeatureSection from './components/FeatureSection';
import Testimonials from './components/Testimonials';
import ContactUsForm from './components/ContactUsForm';
// services and components

function Pricing() {
  return (
    <Box className=" mt-[70px]">
      <HeroSection />
      <Box className=" bg-skin flex justify-center items-center py-16 px-5">
        <Grid2 className=" max-w-[1024px] " container justifyContent="center" spacing={4}>
          <Grid2 xs={12} md={4}>
            <GridItemCard
              icon={<SavedSearchOutlined />}
              head="Get discovered"
              subHead="Visible among over 2 million potential customers on both Booklyz.com and our app."
              boxed
            />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <GridItemCard
              icon={<ArticleOutlined />}
              head="Collect administration"
              subHead="Manage all your bookings, administration, payments and accounting in a single system."
              boxed
            />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <GridItemCard
              icon={<SpatialAudioOutlined />}
              head="Make life more enjoyable"
              subHead="Let us take care of the boring stuff and give you more time to focus on what you're passionate about."
              boxed
            />
          </Grid2>
        </Grid2>
      </Box>
      <AboutUs />
      <FeatureSection />
      <Box className=" bg-skin flex flex-col justify-center items-center py-24 px-5">
        <Typography variant="h2" className=" normal-case my-2 font-semibold text-center">
          Additional services
        </Typography>
        <Grid2
          mt={3}
          className=" max-w-[1024px] "
          container
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid2 xs={12} md={6}>
            <GridItemCard
              icon={<CreditCard />}
              head="Cash system and card terminal"
              subHead="Extend the booking system with a checkout system adapted for companies in the beauty and health sector. The checkout system is fully integrated with your booking calendar, and we offer unified support for the booking system, checkout and terminal. Dream!"
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GridItemCard
              icon={<NoteAdd />}
              head="Journal system"
              subHead="Are you looking for a simple and secure journal system that is integrated with your booking system? Look no further! Our journal system is adapted for companies in health and beauty. It works for different types of businesses and is fully integrated with our booking system."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GridItemCard
              icon={<CurrencyExchange />}
              head="Automatic accounting"
              subHead="You can connect Fortnox with Bokadirekt, and give yourself a seamless flow between booking and payment with automatic accounting."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GridItemCard
              icon={<RequestQuote />}
              head="Salary system"
              subHead="Do you have salaried employees? Manage your salaries with our simple payroll system adapted for companies in the beauty and health sector."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
        </Grid2>
      </Box>
      <Testimonials />
      <ContactUsForm />
      <PlanCardsContainer />
    </Box>
  );
}

export default Pricing;
