'use client';

import { Box, Container } from '@mui/material';
import React from 'react';
import propTypes from 'prop-types';
import CompanyCards from './components/CompanyCards';
import { useGetPublicCompanyQuery } from '@/services/public/companyServices';
import EmptyDataSection from '../common/components/EmptyDataSection';
import SectionLoader from '../common/loaders/SectionLoader';

function Search({ searchParams }) {
  const { data, isLoading, isFetching } = useGetPublicCompanyQuery({
    city: searchParams?.city || undefined,
    search: searchParams?.search || undefined,
    company__address: searchParams?.company__address || undefined,
    start_date: searchParams?.start_date || undefined,
    end_date: searchParams?.end_date || undefined,
    category_id: searchParams?.category || undefined,
  });
  const loading = isLoading || isFetching;

  return (
    <Container variant="portal" sx={{ marginTop: '140px' }}>
      <Box>
        {loading && <SectionLoader />}
        {!loading &&
          data?.length > 0 &&
          data?.map(item => (
            <CompanyCards
              key={item?.id}
              title={item?.name}
              id={item?.id}
              images={item?.company_images}
              description={item?.company_description}
              address={item?.address}
              rating={item?.company_feedback}
            />
          ))}
        {!loading && data?.length === 0 && <EmptyDataSection />}
      </Box>
    </Container>
  );
}

Search.propTypes = {
  searchParams: propTypes.object,
};

export default Search;
