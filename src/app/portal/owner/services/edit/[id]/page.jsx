import React from 'react';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import BackButton from '@/app/common/components/BackButton';
import AddEditServicesForm from '../../components/AddEditServicesForm';

function EditServicesForm({ params: { id } }) {
  return (
    <>
      <Stack mb={4} direction="row" justifyContent="space-between">
        <Typography variant="pageTitle">Edit Services</Typography>
        <BackButton />
      </Stack>

      <AddEditServicesForm serviceSlug={id} />
    </>
  );
}

EditServicesForm.propTypes = {
  params: PropTypes.object,
};

export default EditServicesForm;
