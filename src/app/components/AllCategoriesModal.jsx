import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useGetCategoriesQuery } from '@/services/private/categories';
import EmptyDataSection from '../common/components/EmptyDataSection';
import SectionLoader from '../common/loaders/SectionLoader';

function AllCategoriesModal() {
  const { data, isLoading, isFetching } = useGetCategoriesQuery();
  return (
    <Box>
      {(isLoading || isFetching) && (
        <Box className="w-full h-full flex justify-center items-center">
          <SectionLoader />
        </Box>
      )}
      {data?.results?.map(item => (
        <Box className=" py-4 border-b border-border last:border-0 last:pb-0 w-full">
          <Link href={`/search?category=${item?.id}`} className=" w-full">
            <Typography variant="body1" fontWeight={500}>
              {item?.name}
            </Typography>
          </Link>
        </Box>
      ))}
      {!(isLoading || isFetching) && data?.results?.length === 0 && <EmptyDataSection />}
    </Box>
  );
}

export default AllCategoriesModal;
