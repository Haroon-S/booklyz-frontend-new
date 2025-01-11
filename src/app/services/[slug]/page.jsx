/* eslint-disable no-unused-vars */

'use client';

import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useGetServiceQuery } from '@/services/private/services';
import ServiceCard from '../components/ServiceCard';

function Services({ params }) {
  const { data, isLoading, isFetching } = useGetServiceQuery(
    {
      sub_category: params?.slug,
    },
    { skip: !params?.slug }
  );

  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <Box>
        <ServiceCard />
      </Box>
    </Container>
  );
}

Services.propTypes = {
  params: PropTypes.object,
};

export default Services;
