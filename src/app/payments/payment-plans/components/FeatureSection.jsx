import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Payments } from '@mui/icons-material';
import image2 from '@/assets/business-page/image2.JPG';
import image3 from '@/assets/business-page/image3.JPG';

function FeatureSection() {
  return (
    <Box>
      <Box className=" bg-skin flex justify-center items-center py-32 px-5">
        <Box className=" w-full flex flex-col justify-center items-center max-w-[1024px] ">
          <Box className=" w-full flex flex-wrap gap-10">
            <Box className=" max-w-[550px]">
              <Box className=" bg-orange-500 rounded-full w-fit p-3 mb-2">
                <Sparkles className=" text-white" />
              </Box>
              <Typography variant="h3" className=" normal-case mb-6 font-semibold text-center md:text-start">
                A portal to your future loyal customers
              </Typography>
              <Typography variant="body2" className=" text-center md:text-start font-medium">
                Booklyz and our app are Bulgaria&apos;s largest marketplace for beauty and health. Every
                month, over 2 million bookings are mediated, where customers can easily find and book services
                such as massages, hairdresser visits and nail care.
              </Typography>
              <Typography variant="body2" className=" text-center md:text-start my-6 font-medium">
                The platform simplifies everyday life by offering a smooth and safe experience where the best
                professionals in the industry are gathered in one place.
              </Typography>
              <Typography variant="body2" className=" text-center md:text-start my-6 font-medium">
                Regardless of whether it&apos;s about relaxation or taking care of your health, Booklyz is the
                place where customers find what they need.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className=" w-full font-normal py-3 text-sm md:w-44"
              >
                Get more customers
              </Button>
            </Box>
            <Box className=" w-[350px] h-[350px] relative">
              <Image
                src={image2}
                alt="hero-image"
                className=" object-cover rounded-t-full rounded-b-full"
                fill
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className=" flex justify-center items-center py-32 px-5">
        <Box className=" w-full flex flex-col justify-center items-center max-w-[1024px] ">
          <Box className=" w-full flex flex-wrap flex-row-reverse justify-between gap-10">
            <Box className=" max-w-[550px]">
              <Box className=" bg-orange-500 rounded-full w-fit p-3 mb-2">
                <Payments className=" text-white" />
              </Box>
              <Typography variant="h3" className=" normal-case mb-4 font-semibold text-center md:text-start">
                Let your customers pay when booking
              </Typography>
              <Typography variant="body2" className="text-center md:text-start font-medium">
                By offering online payment when booking, you can attract more new visitors and at the same
                time reduce the risk of no-shows. Advance payments create security and loyalty, and make it
                easier for customers to stick to their bookings.
              </Typography>
              <Typography variant="body2" className="text-center md:text-start my-6 font-medium">
                In addition, all common payment methods are included, giving your customers the flexibility to
                choose what suits them best.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className=" w-full font-normal py-3 text-sm md:w-48"
              >
                Get paid for your time
              </Button>
            </Box>
            <Box className=" w-[350px] h-[350px] relative">
              <Image
                src={image3}
                alt="hero-image"
                className=" object-cover rounded-t-full rounded-b-full"
                fill
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FeatureSection;
