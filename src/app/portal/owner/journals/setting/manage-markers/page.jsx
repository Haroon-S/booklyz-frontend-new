'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import ActionBtns from '@/app/common/components/ActionBtns';
import ViewDocModal from '@/app/common/components/ViewDocModal';
import * as Yup from 'yup';
import { useAddAssetsMutation, useGetAssetsQuery } from '@/services/private/assets';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import FormikField from '@/shared/components/form/FormikField';
import { contentModalStyles } from '@/styles/mui/common/modal-styles';
import { viewModalReducer } from '@/utilities/reducerActions';
import { Box, Divider, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useReducer } from 'react';

function ManageMarkers() {
  const [viewModal, setViewModal] = useReducer(viewModalReducer, {
    isViewModalOpen: false,
    selectedFile: null,
  });

  const { data: assetsTemplates } = useGetAssetsQuery({ template_type: 'marker' });
  const [addAssetTemplate] = useAddAssetsMutation();
  const { isViewModalOpen, selectedFile } = viewModal;

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
  return (
    <div className="w-full">
      <Paper className="p-4 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            file: '',
            title: '',
            file_type: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().max(75, 'Maximum 75 characters allowed').required('Required!'),
            file: Yup.mixed().test('fileSize', 'File size must be less than 1 MB', value => {
              if (value?.size > 1000000) return false;

              return true;
            }).required('Required!'),
          })}
          onSubmit={async (values, { resetForm }) => {
            const formData = new FormData();

            formData.append('image', values.file);
            formData.append('title', values.title);
            formData.append('template_type', 'marker');

            await addAssetTemplate(formData);

            resetForm({
              file: '',
              title: '',
              file_type: '',
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

                <FormikField
                  name="title"
                  label="Marker Title"
                  isRequired
                  type="text"
                  placeholder="Title"
                  isStack
                />

                <ActionBtns
                  initialValues={{
                    file_type: '',
                    file: null,
                  }}
                  submitText="Upload"
                />

                <Divider />
              </Stack>
            </Form>
          )}
        </Formik>

        <Grid container className=' px-5 py-2' spacing={2}>
          {assetsTemplates?.results?.length > 0 ? (
            assetsTemplates?.results.map(item => (
              <Stack alignItems="center">
                <img
                  onClick={() => handleViewFile(item?.image, 'image')}
                  src={item.image}
                  style={{ maxWidth: '100%', maxHeight: '100px' }}
                  className=" cursor-pointer"
                />
                <Typography variant="body2">{item?.title}</Typography>
              </Stack>
            ))
          ) : (
            <Typography className=" p-5 ">No Data</Typography>
          )}
        </Grid>
        {/* VIEW FILE MODAL */}
        <Modal open={isViewModalOpen} onClose={toggleViewModal}>
          <Box sx={contentModalStyles}>
            <ViewDocModal selected={selectedFile} toggle={toggleViewModal} />
          </Box>
        </Modal>
      </Paper>
    </div>
  );
}

export default ManageMarkers;
