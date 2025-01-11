/* eslint-disable no-unused-vars */

'use client';

import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import ModalHeader from '@/app/common/components/ModalHeader';
import ServiceDetail from './ServiceDetail';
import ServiceInfoModal from './ServiceInfoModal';

function ServiceItemGrid({ title = '', price = '', timing = '', description = '', id = null }) {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const toggleInfoModal = () => {
    setInfoModalOpen(!isInfoModalOpen);
  };

  const router = useRouter();

  const toggleModal = async () => {
    if (isAuthenticated) {
      setModalOpen(!isModalOpen);
    } else {
      router.push('/auth/signin');
    }
  };
  return (
    <Box className=" hover:bg-sky-100 flex justify-between items-center transition-all duration-300 cursor-pointer py-3 md:px-3">
      <Box>
        <Typography variant="h6" className="font-semibold">
          {title}
        </Typography>
        <Box className=" flex flex-wrap justify-between item-baseline gap-1 md:gap-3">
          <Typography variant="h6" className=" text-grey font-semibold">
            {timing}min, DKK {price}
          </Typography>
          <Typography onClick={toggleInfoModal} variant="h6" className=" text-sky-700 underline font-semibold">
            More Info
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button onClick={toggleModal} variant="contained" className=" bg-dark">
          Book
        </Button>
      </Box>

      <Modal open={isInfoModalOpen} onClose={toggleInfoModal}>
        <Box sx={{ ...formModalStyles, width: '300px', }}>
          <ModalHeader title="Booking Details" onClose={toggleInfoModal} />
          <ServiceInfoModal serviceData={description} />
        </Box>
      </Modal>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, width: '600px' }}>
          <ModalHeader title="Selected Service" onClose={toggleModal} />
          <ServiceDetail title={title} price={price} timing={timing} id={id} />
        </Box>
      </Modal>
    </Box>
  );
}

ServiceItemGrid.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  timing: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
};

export default ServiceItemGrid;
