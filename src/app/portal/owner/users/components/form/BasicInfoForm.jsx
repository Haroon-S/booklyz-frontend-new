/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Remove } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import FormikField from '@/shared/components/form/FormikField';
import FormikSelect from '@/shared/components/form/FormikSelect';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import { border } from '@/styles/common/colors';
import FormikTimePicker from '@/shared/components/form/FormikTimePicker';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import useUserContext from '@/customHooks/useUserContext';
import { basicInfoFormInitVals, basicInfoFormValSchema } from '../../utilities/formUtils';
import ContactFieldArray from './ContactFieldArray';
import FormikFileField from '@/shared/components/form/FormikFileField';

function BasicInfoForm() {
  const { setActiveStep, setUserData, userData, callingCodeOptions } = useUserContext();
  const [initValues, setInitValues] = useState(basicInfoFormInitVals);
  const [previewImage, setPreviewImage] = useState('');

  const handleChangeImage = file => {
    if (file) {
      const blob = URL.createObjectURL(file);

      setPreviewImage(blob);
    } else {
      setPreviewImage('');
    }
  };

  // API HOOKS
  useEffect(() => {
    if (userData) {
      setInitValues(prevState => ({ ...prevState, ...userData }));
    }
  }, [userData]);

  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={basicInfoFormValSchema}
        onSubmit={values => {
          setUserData(prevState => ({ ...prevState, ...values }));
          setActiveStep(prevState => prevState + 1);
          window.scrollTo(0, 0);
        }}
      >
        {({ isSubmitting, values, resetForm, errors }) => (
          <Form>
            <Stack className="w-full" rowGap={4}>
              <Grid2 spacing={5} container>
                <Grid2 container spacing={3} xs={12}>
                  <Grid2 xs={6}>
                    <Box className=" flex items-center gap-3">
                      <Avatar src={values?.image && typeof values?.image === 'string' ? values?.image : previewImage} className=" h-14 w-14" />
                      <FormikFileField
                        name="image"
                        type="file"
                        onChange={newValue => handleChangeImage(newValue)}
                        minimal
                        btnVariant="contained"
                        btnText={values?.image ? 'Update Image' : 'Add Image'}
                      />
                    </Box>
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={3} xs={12} md={6}>
                  <Stack spacing={2} width="100%">
                    <FormikField
                      name="first_name"
                      label="First Name"
                      isRequired
                      type="text"
                      placeholder="First Name"
                      isStack
                    />

                    <FormikField
                      name="nick_name"
                      label="Nick Name"
                      isRequired
                      type="text"
                      placeholder="Nick Name"
                      isStack
                    />

                    <FormikField
                      name="social_security_number"
                      label="Social Security Number"
                      isRequired
                      type="text"
                      placeholder="Social Security Number"
                      isStack
                    />
                  </Stack>
                </Grid2>
                <Grid2 container spacing={3} xs={12} md={6}>
                  <Stack spacing={2} width="100%">
                    <FormikField
                      name="last_name"
                      label="Last Name"
                      isRequired
                      type="text"
                      placeholder="Last Name"
                      isStack
                    />

                    <FormikField
                      name="signature"
                      label="Signature"
                      isRequired
                      type="text"
                      placeholder="Signature"
                      isStack
                    />
                  </Stack>
                </Grid2>
                <Grid2 container spacing={3} xs={12}>
                  <ContactFieldArray name="staff_contacts" />
                </Grid2>
              </Grid2>
            </Stack>
            <Box className="flex w-100 items-end justify-end" mt={3}>
              <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default BasicInfoForm;
