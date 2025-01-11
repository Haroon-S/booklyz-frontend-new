/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */

'use client';

import ActionBtns from '@/app/common/components/ActionBtns';
import { useAddUserProfileFilesMutation, useGetUserProfileFilesQuery } from '@/services/private/users';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import { Box, Divider, Grid, Modal, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useParams } from 'next/navigation';
import React, { useReducer } from 'react';
import DocIcon from '@/assets/doc-icon.jpg';
import ViewDocModal from '@/app/common/components/ViewDocModal';
import { contentModalStyles } from '@/styles/mui/common/modal-styles';
import { viewModalReducer } from '@/utilities/reducerActions';

function PatientFiles() {
  const { id } = useParams();

  const [viewModal, setViewModal] = useReducer(viewModalReducer, {
    isViewModalOpen: false,
    selectedFile: null,
  });
  const { isViewModalOpen, selectedFile } = viewModal;

  const [addPatientFile] = useAddUserProfileFilesMutation();
  const { data: patientFiles } = useGetUserProfileFilesQuery();

  const handleFileChange = (acceptedFiles, setFieldValue) => {
    if (acceptedFiles) {
      const file = acceptedFiles; // Handling single file upload
      const fileType = file.type.split('/')[0]; // Extract MIME type (e.g., "image/png")
      setFieldValue('file', file); // Update file in Formik
      setFieldValue('file_type', fileType === 'image' ? 'image' : 'file'); // Determine file type
    }
  };

   // FILE VIEW HANDLERS
   const handleViewFile = (fileValue, fileType) => {
    setViewModal({ type: 'viewFile', payload: { file: fileValue, type: fileType } });
  };

  const toggleViewModal = () => {
    setViewModal({ type: 'modal', payload: !isViewModalOpen });
  };

  console.log('patientFiles  ==> ', patientFiles);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          file: '',
          file_type: '',
          user: id,
        }}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();

          formData.append('file', values.file);
          formData.append('file_type', values.file_type);
          formData.append('user', values.user);

          await addPatientFile(formData);

          resetForm({
            file: '',
            file_type: '',
            user: id,
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form style={{ width: '100%' }}>
            <Stack spacing={2} minWidth="100%" my={2}>
              <Typography variant="body1" mb={2}>
                Files
              </Typography>

              <FormikDropZone
                name="file"
                // multiple
                onChange={file => {
                  console.log('file ==> ', file);
                  if (file) {
                    handleFileChange(file, setFieldValue);
                    setFieldValue('file', file); // Update the file value in Formik
                  }
                }}
              />

              <ActionBtns
                initialValues={{
                  file_type: '',
                  file: null,
                  user: id,
                }}
                submitText="Upload"
              />

              <Divider />
            </Stack>
          </Form>
        )}
      </Formik>

      <Grid container spacing={2}>
        {patientFiles?.length > 0 ? (
          patientFiles.map(item => (item?.file_type === 'image' ? (
              <Stack alignItems="center">
                <img
                  onClick={() => handleViewFile(item?.file, item?.file_type)}
                  src={item.file}
                  style={{ maxWidth: '100%', maxHeight: '100px' }}
                  className=' cursor-pointer'
                />
                <Typography variant="body2">File-{id}</Typography>
              </Stack>
            ) : (
              <Stack alignItems="center">
                <img
                  onClick={() => handleViewFile(item?.file, item?.file_type)}
                  src={DocIcon?.src}
                  style={{ maxWidth: '100%', maxHeight: '100px' }}
                  className=' cursor-pointer'
                />
                <Typography variant="body2">File-{id}</Typography>
              </Stack>
            )))
        ) : (
          <Typography>No Data</Typography>
        )}

        <Grid item xl={2} lg={2} md={3}></Grid>
      </Grid>
      {/* VIEW FILE MODAL */}
      <Modal open={isViewModalOpen} onClose={toggleViewModal}>
        <Box sx={contentModalStyles}>
          <ViewDocModal selected={selectedFile} toggle={toggleViewModal} />
        </Box>
      </Modal>
    </div>
  );
}

export default PatientFiles;
