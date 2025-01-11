import React from 'react';
import { Box, Typography } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import PageWrapper from '../common/components/PageWrapper';
import { primary } from '@/styles/common/colors';
import image from '@/assets/home-banner.jpg';
// import CommonQuestionCard from './components/CommonQuestionCard';
import FaqContainer from '../common/components/faqSection/FaqContainer';
import { faqs } from '@/utilities/common';

function Support() {
  return (
    <PageWrapper bgColor={primary} heading="SUPPORT" imageSrc={image.src} showButton height="250px">
      <Box className=" mt-12">
        <Typography variant="h4">Common Question & answers</Typography>
        {/* <Typography variant="h6" className="mt-4 text-grey">
          As For Your Case
        </Typography> */}
        {/* <SubCategoriesCards /> */}
        {/* <Grid2 container alignItems="start" justifyContent="start" spacing={4}>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} lg={4}>
            <CommonQuestionCard />
          </Grid2>
        </Grid2> */}
        <Box>
          <FaqContainer heading="Frequently" subHeading="Asked Questions" faqs={faqs} />
        </Box>
      </Box>
    </PageWrapper>
  );
}

export default Support;
