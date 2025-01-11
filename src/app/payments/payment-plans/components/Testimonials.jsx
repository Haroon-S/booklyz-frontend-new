/* eslint-disable max-len */
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import TestimonialsCards from './TestimonialsCards';

function Testimonials() {
  return (
    <Box className=" bg-[#f0e6f2] flex flex-col justify-center items-center py-20 px-5">
      <Typography variant="h3" className=" normal-case my-2 font-semibold text-center">
        What our users say about Bokadirekt
      </Typography>
      <Grid2
        mt={3}
        className=" max-w-[1024px] "
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid2 xs={12} md={4}>
          <TestimonialsCards
            feedback="In the beginning, we didn't think it was that important with Bokadirekt. So we switched to another system, and during those two weeks that we were without Bokadirekt, we realized how important it is to have a good booking system, so we immediately switched back and that has helped us a lot. Bokadirekt makes it easy for me to keep track of turnover & bookings"
            name="Johan Ure"
            avatar=""
            designation="CEO, Barbers of Sweden"
          />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards
            feedback="The integrated checkout is my absolute favorite function: here we can easily and quickly take payment, split the payment with different payment methods and as a bonus then in a simple way, in the customer's history, follow their previous product purchases and make follow-ups and get a direct forecast of how the economy looks today."
            name="Sofia Arvani"
            avatar=""
            designation="Founder, Scratch Salons"
          />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards
            feedback="The best thing is being able to have appointments, records and billing in the same portal. It's so convenient to have everything together. Once the customer sits in the treatment chair, it facilitates such quick handling. Then I like that I can upload images and use the area map, as well as plotting how much of a product I have consumed."
            name="Johanna Hallmar"
            avatar=""
            designation="Dentist, Dentotox"
          />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards
            feedback="Since I started using Bokadirekt, everything in my working life has become smoother. I could never work without it today. Calls to the salon have decreased, which means that you can focus fully on the customers who are actually in the salon. Then I like the new feature that allows customers to put themselves on a waiting list."
            name="Emelie Karlsson"
            avatar=""
            designation="Hairdresser/makeup artist, Salon two sisters"
          />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards
            feedback="There are many good features on Bokadirekt, but the online booking itself, which allows the customer to make their booking at any time of the day, is the foundation and it makes things much easier for me and the customer."
            name="Lena Landwall"
            avatar=""
            designation="Hairdresser, Studio Sweet"
          />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards
            feedback="I think all of Bokadirekt's functions are great. Above all, it's convenient that customers can book appointments themselves, so that you don't have to be contacted every time someone wants to book a treatment. The reviews are also a good feature, I have many customers who leave a comment after his visit."
            name="Nena Drustniac"
            avatar=""
            designation="Nurse, Nena Clinic"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Testimonials;
