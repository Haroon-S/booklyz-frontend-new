'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import HeroSection from '@/shared/components/HeroSection';
import { primary } from '@/styles/common/colors';
import useGetUserRoles from '@/customHooks/useGetUserRoles';

function PageWrapper({ heading, heading2, Description, imageSrc, bgColor, children, showButton, showSearch, height = '700px' }) {
  const { isSupplier } = useGetUserRoles();
  return (
    <>
      <HeroSection
        heading={heading}
        heading2={heading2}
        Description={Description}
        buttons={[
          {
            text: 'Become a client',
            link: '/auth/signup',
            show: showButton,
            color: primary,
          },
          {
            text: 'Become a Supplier',
            link: '/auth/signup',
            show: showButton,
            color: 'success',
          },
          {
            text: isSupplier ? 'Services' : 'Find Services',
            link: isSupplier ? 'portal/supplier/services' : '/services',
            show: showButton,
            color: 'success',
            authenticated: true
          },
        ]}
        imageSrc={imageSrc}
        bgColor={bgColor}
        height={height}
        showSearch={showSearch}
      />

      <Container variant="public" sx={{ minHeight: height, marginTop: '20px' }}>{children}</Container>

    </>
  );
}
PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  heading2: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  showButton: PropTypes.bool.isRequired,
  showSearch: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
};
export default PageWrapper;
