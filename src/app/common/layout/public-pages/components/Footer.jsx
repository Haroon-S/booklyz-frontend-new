/* eslint-disable no-unused-vars */

'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

// Styles
import { Apple, Shop } from '@mui/icons-material';
import styles from '@/styles/containers/layout/footer.module.scss';
import { footerDividerStyles, footerLinksStyles } from '@/styles/mui/containers/layout/footer-styles';
import { footerContainerStyles } from '@/styles/mui/components/footer-top-sections-styles';
import logo from '@/assets/Booklyz.svg';
import paymentIcon1 from '@/assets/icons/payment-method-mastercard.svg';
import paymentIcon2 from '@/assets/icons/payment-method-visa.svg';
import paymentIcon3 from '@/assets/icons/payment-method-paypal.png';
import GooglePlay from '@/assets/GooglePlay.svg';
import AppStore from '@/assets/AppStore.svg';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { border } from '@/styles/common/colors';
import NewsLetter from './NewsLetter';
import { useGetCategoriesQuery } from '@/services/private/categories';

function Footer({ footerText = '', footerBgColor = '', textColor = '', btnBg = '', btnText = '' }) {
  const { data: trendingSectionsData } = useGetCategoriesQuery({
    offset: '0',
    limit: '10',
  });
  const { data: topCategoriesData } = useGetCategoriesQuery({
    offset: '10',
    limit: '10',
  });
  const { data: featuredCategoriesData } = useGetCategoriesQuery({
    offset: '20',
    limit: '10',
  });
  const dateObject = new Date();
  const currentYear = dateObject.getFullYear();

  return (
    <Box sx={footerContainerStyles} className={styles.footerBox}>
      {/* FOOTER MAIN BODY LINKS */}
      <Box className="flex justify-center">
        <Grid container spacing={4} className=" px-1 md:px-0 flex justify-between" sx={footerLinksStyles}>
          <Grid container item xs={12} md={3} justifyItems="center" gap={10}>
            <Grid item xs={12}>
              <Image src={logo?.src} alt="Logo" width={130} height={130} className=" mt-10" />
              <Typography variant="h6" className="mt-5 font-medium">
                Booklyz for businesses
              </Typography>
              <Typography variant="body1" className=" mt-1 font-normal">
                At Booklyz, we believe in making life simpler. Whether you’re booking a beauty treatment,
                medical consultation, or wellness service, our platform brings everything to one place.
              </Typography>
              <a href="/payments/payment-plans" target="_blank" rel="noopener noreferrer">
                <Button variant="contained" className=" w-full md:w-fit bg-dark mt-5">
                  Booklyz för företag
                </Button>
              </a>
              <Box className=" mt-3 w-full flex justify-center md:justify-start items-center gap-2">
                <Image src={paymentIcon1?.src} alt="Logo" width={40} height={40} />
                <Image src={paymentIcon2?.src} alt="Logo" width={40} height={40} />
                <Image src={paymentIcon3?.src} alt="Logo" width={40} height={40} />
                {/* <Box className=" w-[34px] h-[22px] aspect-video relative">
                  <Image src={paymentIcon3?.src} alt="Logo" fill />
                </Box> */}
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            gap={{ xs: 0, md: 10, lg: 12, xl: 14, xxl: 16, xxxl: 24 }}
            className=" mt-10 md:mt-28 w-full "
          >
            <Grid item xs={6} sm={4} md={4} lg={3} xl={1.5}>
              <Typography variant="body2" className="mb-3 font-semibold text-grey text-nowrap">
                My account
              </Typography>
              <Link href="/support">
                <Typography variant="body2" className="mb-5 footer-link-item">
                  My Bookings
                </Typography>
              </Link>

              <Typography variant="body2" className=" mt-5 md:mt-5 mb-3 font-semibold text-grey ">
                Contact
              </Typography>
              <Link href="/support">
                <Typography variant="body2" className="mb-5 footer-link-item">
                  Support
                </Typography>
              </Link>
              <Link href="/about" className="text-decoration-none">
                <Typography variant="body2" className="mb-5 footer-link-item">
                  Login for business
                </Typography>
              </Link>
              <Link href="/about" className="text-decoration-none">
                <Typography variant="body2" className="mb-5 footer-link-item">
                  About Booklyz
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={6} sm={4} md={4} lg={3} xl={1.5}>
              <Typography variant="body2" className=" ml-3 md:ml-0 mb-3 font-semibold text-grey text-nowrap">
                Trending Sections
              </Typography>
              {trendingSectionsData?.results?.map(item => (
                <Link href={`/search?category=${item?.id}`} key={item?.id} className="text-decoration-none">
                  <Typography variant="body2" className="ml-3 md:ml-0 mb-5 footer-link-item">
                    {item?.name}
                  </Typography>
                </Link>
              ))}
            </Grid>

            <Grid item xs={6} sm={4} md={4} lg={3} xl={1.5}>
              <Typography variant="body2" className="mb-3 font-semibold text-grey text-nowrap">
                Top Categories
              </Typography>
              {topCategoriesData?.results?.map(item => (
                <Link href={`/search?category=${item?.id}`} key={item?.id} className="text-decoration-none">
                  <Typography variant="body2" className="mb-5 footer-link-item">
                    {item?.name}
                  </Typography>
                </Link>
              ))}
            </Grid>

            <Grid item xs={6} sm={4} md={4} lg={3} xl={1.5}>
              <Typography variant="body2" className=" ml-3 md:ml-0 mb-3 font-semibold text-grey text-nowrap">
                Featured Topics
              </Typography>
              {featuredCategoriesData?.results?.map(item => (
                <Link href={`/search?category=${item?.id}`} key={item?.id} className="text-decoration-none">
                  <Typography variant="body2" className="ml-3 md:ml-0 mb-5 footer-link-item">
                    {item?.name}
                  </Typography>
                </Link>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* BOTTOM FOOTER */}
      <Box className=" w-full flex justify-center md:justify-start">
        <Box py="25px" className={`${styles.footerResponsiveLayout} container-max-width`}>
          <Typography color="GrayText" variant="body3">
            © {currentYear} Booklyz All Rights Received
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

Footer.propTypes = {
  footerText: PropTypes.string,
  footerBgColor: PropTypes.string,
  textColor: PropTypes.string,
  btnBg: PropTypes.string,
  btnText: PropTypes.string,
};

export default Footer;
