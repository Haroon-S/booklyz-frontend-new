/* eslint-disable no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { companyFormInitVals, companyFormValSchema } from '../../utilities/formUtils';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import FormikField from '@/shared/components/form/FormikField';
import {
  useAddCompanyMutation,
  useGetCompanyStaffQuery,
  useUpdateCompanyMutation,
} from '@/services/private/company';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import { transformToFormData } from '@/utilities/transformers';
import FormikSelect from '@/shared/components/form/FormikSelect';
import FormikTimePicker from '@/shared/components/form/FormikTimePicker';

function AddEditCompanyForm({ companyData = {}, toggleAddModal }) {
  const [initValues, setInitValues] = useState(companyFormInitVals);

  const { data: userData } = useGetCompanyStaffQuery();
  const [addCompany, { error, isSuccess }] = useAddCompanyMutation();
  const [updateCompany, { error: editError, isSuccess: isEditSuccess }] = useUpdateCompanyMutation();
  useHandleApiResponse(error, isSuccess, 'Store added successfully!');
  useHandleApiResponse(editError, isEditSuccess, 'Store updated successfully!');

  const availabilityDaysOptions = [
    { value: 'all_days', label: 'All Days' },
    { value: 'week_days', label: 'Week Days' },
    { value: 'weekend', label: 'Weekend' },
  ];

  const userOptions = useMemo(() => {
    if (userData) {
      return userData?.map(item => ({
        label: item.username,
        value: item.id,
      }));
    }

    return [];
  }, [userData]);

  useEffect(() => {
    if (companyData?.name) {
      setInitValues({
        name: companyData?.name || '',
        email: companyData?.email || '',
        phone: companyData?.phone || '',
        address: companyData?.address || '',
        about_company: companyData?.about_company || '',
        company_description: companyData?.company_description || '',
        company_images: companyData?.company_images || [],
        website: companyData?.mata_data?.website || '',
        availability_days: companyData?.mata_data?.availability_days || '',
        availability_start_time: companyData?.mata_data?.availability_start_time || '',
        availability_end_time: companyData?.mata_data?.availability_end_time || '',
        is_active: true,
      });
    }
  }, [companyData]);

  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={companyFormValSchema}
        onSubmit={async values => {
          const metaData = {
            website: values?.website,
            availability_days: values?.availability_days,
            availability_start_time: values?.availability_start_time,
            availability_end_time: values?.availability_end_time,
          }

          const formData = transformToFormData(values, metaData);
          if (companyData?.name) {
            await updateCompany({ formData, slug: companyData?.id });
          } else {
            await addCompany(formData);
          }
          toggleAddModal();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid2 columnSpacing={4} container>
              <Grid2 container rowSpacing={4} xs={12} md={6}>
                <Stack spacing={1}>
                  <FormikField name="name" label="Name" isRequired type="text" placeholder="Name" isStack />
                  <FormikField
                    name="phone"
                    label="Phone"
                    isRequired
                    type="text"
                    placeholder="phone"
                    isStack
                  />

                  <FormikSelect
                    name="availability_days"
                    label="Availability Days"
                    options={availabilityDaysOptions || []}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />

                  <FormikTimePicker
                    label="Availability Start Time"
                    name="availability_start_time"
                    isRequired
                    isStack
                  />

                  <FormikField
                    name="about_company"
                    label="About Store"
                    isRequired
                    type="textarea"
                    placeholder="About Store"
                    rows={6}
                    isStack
                  />
                </Stack>
              </Grid2>
              <Grid2 container alignItems="start" rowSpacing={4} xs={12} md={6}>
                <Stack spacing={1}>
                  <FormikField
                    name="email"
                    label="Email"
                    isRequired
                    type="text"
                    placeholder="Email"
                    isStack
                  />
                  <FormikField
                    name="address"
                    label="Address"
                    isRequired
                    type="text"
                    placeholder="Address"
                    isStack
                  />

                  <FormikField
                    name="website"
                    label="Website"
                    isRequired
                    type="text"
                    placeholder="Website"
                    isStack
                  />

                  <FormikTimePicker
                    label="Availability End Time"
                    name="availability_end_time"
                    isRequired
                    isStack
                  />

                  <FormikField
                    name="company_description"
                    label="Store Description"
                    isRequired
                    type="textarea"
                    placeholder="Store Description"
                    rows={6}
                    isStack
                  />
                </Stack>
              </Grid2>

              <Grid2 container rowSpacing={4} xs={12} md={12} mt={3}>
                <Typography variant="label">Images</Typography>
                <Box className="w-full">
                  <FormikDropZone label="Images" name="company_images" placeholder="Files" multiple />
                </Box>
              </Grid2>
            </Grid2>
            <Box className="flex w-100 items-end justify-end gap-3" mt={3}>
              <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

AddEditCompanyForm.propTypes = {
  companyData: PropTypes.object,
  toggleAddModal: PropTypes.func,
};

export default AddEditCompanyForm;
