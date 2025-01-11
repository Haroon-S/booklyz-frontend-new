import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { ArticleOutlined, BadgeOutlined, PaymentsOutlined, PublicOutlined, RocketLaunchOutlined, RoomServiceOutlined, SavedSearchOutlined, TravelExploreOutlined } from '@mui/icons-material';
import GridItemCard from './GridItemCard';

function AboutUs() {
  return (
    <Box className=" flex justify-center items-center py-24 px-5">
      <Box className=" w-full flex flex-col justify-center items-center max-w-[1024px] ">
        <Typography variant="h2" className=" normal-case my-2 font-semibold text-center">
          More than a booking system
        </Typography>
        <Typography variant="body2" className=" leading-6 tracking-wide text-center w-full md:w-[650px]">
          Skip paper & pen and say hello to a simpler everyday life with a digital booking calendar. But
          Booklyz booking system is so much more than that!
        </Typography>
        <Grid2 mt={3} container justifyContent="center" spacing={4}>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<TravelExploreOutlined />}
              head="Online booking"
              subHead="Save time by letting your customers book and manage their reservations online - 24 hours a day."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<SavedSearchOutlined />}
              head="Marketplace"
              subHead="Let new customers find you on Bulgaria's largest marketplace for services in beauty and health."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<PaymentsOutlined />}
              head="Payments"
              subHead="Possibility of payment both online and on site, which provides flexibility and convenience."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<RoomServiceOutlined />}
              head="Cash system"
              subHead="Certified according to the Swedish Tax Agency's requirements, which ensures that all transactions are handled correctly."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<BadgeOutlined />}
              head="Customer register"
              subHead="Keep track of your customers and keep them coming back with email and text marketing."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<RocketLaunchOutlined />}
              head="Marketing"
              subHead="Market yourself via SMS, email and other smart features that help you fill your calendar."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<ArticleOutlined />}
              head="Administration"
              subHead="Manage bookings and payments from any device, making administration smooth and efficient."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard
              icon={<PublicOutlined />}
              head="Cloud based"
              subHead="All your data is saved in the cloud, and you can access your system from anyone - everywhere."
              alignItems="start"
              textAlign="left"
            />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default AboutUs;
