'use client';

import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import CompanyTable from './components/table/CompanyTable';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import AddEditCompanyForm from './components/form/AddEditCompanyForm';

function Company() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="pageTitle">Company</Typography>
      </Stack>
      <Paper sx={{ borderRadius: '10px' }} className=" py-14 px-8">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className=" rounded-2xl ml-6"
            startIcon={<Add />}
            onClick={toggleAddModal}
          >
            Create Company
          </Button>
        </Stack>
        <CompanyTable />
        <Modal open={isAddModalOpen} onClose={toggleAddModal}>
          <Box sx={{ ...formModalStyles, width: '900px' }}>
            <ModalHeader title="Add Company" onClose={toggleAddModal} />
            <AddEditCompanyForm toggleAddModal={toggleAddModal} />
          </Box>
        </Modal>
      </Paper>
    </>
  );
}

export default Company;
