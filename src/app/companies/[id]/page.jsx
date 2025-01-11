/* eslint-disable no-unused-vars */

'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { Box, Breadcrumbs, Container, Divider, Modal, Rating, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image';
import { Apartment, Email, MyLocation, Phone } from '@mui/icons-material';
import { useGetPublicCompanyByIdQuery, useGetPublicServiceQuery } from '@/services/public/companyServices';
import dummyImage from '@/assets/dummyImage.png';
import { border } from '@/styles/common/colors';
import ServiceItemGrid from '../components/ServiceItemGrid';
import StaffItemGrid from '../components/StaffItemGrid';
import AboutBusiness from '../components/AboutBusiness';
import CompanyGallery from '../components/CompanyGallery';
import RatingAndReviews from '../components/RatingAndReviews';

// eslint-disable-next-line react/prop-types
function RenderContactInfo({ value, icon, classes = 'mt-1' }) {
  return (
    value && (
      <Typography variant="body1" className={classes}>
        {icon} {value}
      </Typography>
    )
  );
}

function Company() {
  const { id: paramsId } = useParams();

  const { data: companyData } = useGetPublicCompanyByIdQuery(paramsId);
  const { data: serviceData } = useGetPublicServiceQuery({ company: paramsId });

  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography className=" font-semibold" color="inherit">
          Home
        </Typography>
        <Typography className=" text-normal font-semibold text-themeSecondary">
          {companyData?.name}
        </Typography>
      </Breadcrumbs>
      <Grid2 container columnSpacing={{ xs: 0, md: 20 }} mt={5}>
        <Grid2 xs={12} md={7}>
          <Box>
            <Typography variant="h3" className=" font-bold">
              {companyData?.name}
            </Typography>
            {companyData?.company_feedback?.length > 0 ? (
              <Box sx={{ display: 'flex', gap: '5px', marginTop: '10px', alignItems: 'center' }}>
                <Typography variant="h6" className=" font-semibold">
                  {companyData?.company_feedback[0]?.rating}
                </Typography>
                <Rating value={companyData?.company_feedback[0]?.rating} readOnly />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: '5px', marginTop: '10px', alignItems: 'center' }}>
                <Rating value={0} readOnly disabled />
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: '5px', marginTop: '4px' }}>
              <Typography variant="h6" className=" text-grey uppercase font-semibold">
                {companyData?.address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: border }} className="my-6" />

          <Box>
            <Typography variant="h6" className="font-semibold">
              {companyData?.company_description}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: border }} className="my-6" />

          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Book a service
            </Typography>
            <Box className="mt-6">
              {serviceData?.map(item => (
                <ServiceItemGrid
                  title={item?.service_name}
                  price={item?.price}
                  timing={item?.service_timing}
                  description={item?.service_description}
                  id={item?.id}
                />
              ))}
            </Box>
          </Box>
          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Staff
            </Typography>
            <Box className="mt-6">
              {companyData?.company_staff?.map(item => (
                <>
                  <StaffItemGrid
                    name={`${item?.first_name} ${item?.last_name}`}
                    rating={item?.staff_rating}
                    image={item?.image}
                  />
                  <Divider sx={{ borderColor: border }} className="my-3" />
                </>
              ))}
            </Box>
          </Box>
          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Ratings and reviews
            </Typography>
            <RatingAndReviews ratings={companyData?.company_feedback} />
          </Box>
          <AboutBusiness about={companyData?.about_company} />
          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Pictures
            </Typography>
            <Box className="mt-6">
              <CompanyGallery
                images={companyData?.company_images?.length > 0 ? companyData?.company_images : []}
              />
            </Box>
          </Box>
        </Grid2>
        <Grid2 className=" mt-20 md:mt-0" xs={12} md={5}>
          <Box className=" relative w-full aspect-square md:w-96 md:h-96">
            <Image
              src={
                companyData?.company_images?.length > 0
                  ? companyData?.company_images[0].image
                  : dummyImage.src
              }
              alt="company_images"
              className="object-cover rounded-2xl shadow-lg"
              fill
            />
          </Box>
          <Typography variant="h6" className=" font-bold mt-3">
            Details and contact information
          </Typography>
          <RenderContactInfo
            value={companyData?.name}
            icon={<Apartment fontSize="14px" />}
            classes=" font-bold mt-2"
          />
          <Divider sx={{ borderColor: border }} className="my-3" />
          <RenderContactInfo value={companyData?.email} icon={<Email fontSize="13px" />} />
          <Divider sx={{ borderColor: border }} className="my-3" />
          <RenderContactInfo value={companyData?.phone} icon={<Phone fontSize="13px" />} />
          <Divider sx={{ borderColor: border }} className="my-3" />
          <RenderContactInfo value={companyData?.address} icon={<MyLocation fontSize="13px" />} />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Company;
