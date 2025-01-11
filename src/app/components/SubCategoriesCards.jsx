/* eslint-disable no-unused-vars */

'use client';

import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import SubCategoriesCard from './SubCategoriesCard';
import { useGetCategoriesQuery } from '@/services/private/categories';
import EmptyDataSection from '../common/components/EmptyDataSection';
import SectionLoader from '../common/loaders/SectionLoader';
import ModalHeader from '../common/components/ModalHeader';
import AllCategoriesModal from './AllCategoriesModal';
import { formModalStyles } from '@/styles/mui/common/modal-styles';

function SubCategoriesCards() {
  const { data, isLoading, isFetching } = useGetCategoriesQuery({
    offset: '0',
    limit: '9',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(prev => !prev);

  return (
    <Box className=" flex flex-wrap xl:justify-between justify-center items-center gap-8 mt-6">
      {(isLoading || isFetching) && (
        <Box className="w-full h-full flex justify-center items-center">
          <SectionLoader />
        </Box>
      )}
      {!(isLoading || isFetching) &&
        data?.results?.length > 0 &&
        data?.results?.map(item => (
          <SubCategoriesCard
            key={item?.id}
            title={item?.name}
            id={item?.id}
            image={item?.image}
            description={item?.description}
          />
        ))}
      {!(isLoading || isFetching) && data?.results?.length > 0 && (
        <button
          onClick={toggleModal}
          type="button"
          className="md:h-30 flex h-52 w-[348px] rounded-xl items-center justify-center font-semibold transition-colors duration-300 lg:h-48 bg-[#fff7f5] hover:bg-[#ffe0db] text-black-900"
        >
          SHOW ALL CATEGORIES
        </button>
      )}
      {!(isLoading || isFetching) && data?.results?.length === 0 && <EmptyDataSection />}
      <Modal open={modalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, padding: '20px' }}>
          <ModalHeader title="All categories" onClose={toggleModal} />
          <AllCategoriesModal />
        </Box>
      </Modal>
    </Box>
  );
}

export default SubCategoriesCards;
