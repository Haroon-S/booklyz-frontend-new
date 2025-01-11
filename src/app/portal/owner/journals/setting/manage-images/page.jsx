/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */

'use client';

import ActionBtns from '@/app/common/components/ActionBtns';
import ViewDocModal from '@/app/common/components/ViewDocModal';
import { useAddAssetsMutation, useGetAssetsQuery } from '@/services/private/assets';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import { contentModalStyles } from '@/styles/mui/common/modal-styles';
import { viewModalReducer } from '@/utilities/reducerActions';
import { Box, Divider, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useParams } from 'next/navigation';
import React, { useReducer } from 'react';
import DocIcon from '@/assets/doc-icon.jpg';

function ImageTemplate() {
  const { id } = useParams();
  const [viewModal, setViewModal] = useReducer(viewModalReducer, {
    isViewModalOpen: false,
    selectedFile: null,
  });
  const { isViewModalOpen, selectedFile } = viewModal;
  const { data: assetsTemplates } = useGetAssetsQuery({ template_type: 'image' });
  const [addAssetTemplate] = useAddAssetsMutation();

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
      <Paper className="p-4 w-100">
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
              formData.append('template_type', 'image');

              await addAssetTemplate(formData);

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
            {assetsTemplates?.results?.length > 0 ? (
              assetsTemplates?.results.map(item => (item?.file_type === 'image' ? (
                  <Stack alignItems="center">
                    {console.log('item image ==> ', item)}
                    <img
                      onClick={() => handleViewFile(item?.file, item?.file_type)}
                      src={item.file}
                      style={{ maxWidth: '100%', maxHeight: '100px' }}
                      className=" cursor-pointer"
                    />
                    <Typography variant="body2">File-{id}</Typography>
                  </Stack>
                ) : (
                  <Stack alignItems="center">
                    {console.log('item file ==> ', item)}
                    <img
                      onClick={() => handleViewFile(item?.file, item?.file_type)}
                      src={DocIcon?.src}
                      style={{ maxWidth: '100%', maxHeight: '100px' }}
                      className=" cursor-pointer"
                    />
                    <Typography variant="body2">File-{id}</Typography>
                  </Stack>
                )))
            ) : (
              <Typography className=' p-5 '>No Data</Typography>
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

export default ImageTemplate;
