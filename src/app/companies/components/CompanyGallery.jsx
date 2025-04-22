/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import { Box, Modal } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import dummyImage from '@/assets/dummyImage.png';
import { viewModalReducer } from '@/utilities/reducerActions';
import { contentModalStyles } from '@/styles/mui/common/modal-styles';
import ViewDocModal from '@/app/common/components/ViewDocModal';

function CompanyGallery({ images = [] }) {
  const [viewModal, setViewModal] = useReducer(viewModalReducer, {
    isViewModalOpen: false,
    selectedFile: null,
  });

  const { isViewModalOpen, selectedFile } = viewModal;
  const handleViewFile = (fileValue, fileType) => {
    setViewModal({ type: 'viewFile', payload: { file: fileValue, type: fileType } });
  };

  const toggleViewModal = () => {
    setViewModal({ type: 'modal', payload: !isViewModalOpen });
  };

  return (
    <Box className=" mt-6 flex flex-wrap gap-3">
      {images?.map(image => (
        <Box className=" relative w-full aspect-square md:w-64 md:h-64">
          <Image
            onClick={() => handleViewFile(image?.image, 'image')}
            src={image?.image || dummyImage.src}
            alt="Company Image"
            className="object-cover rounded-2xl shadow-lg"
            fill
          />
        </Box>
      ))}

      <Modal open={isViewModalOpen} onClose={toggleViewModal}>
        <Box sx={contentModalStyles}>
          <ViewDocModal selected={selectedFile} toggle={toggleViewModal} />
        </Box>
      </Modal>
    </Box>
  );
}

CompanyGallery.propTypes = {
  images: PropTypes.array,
};

export default CompanyGallery;
