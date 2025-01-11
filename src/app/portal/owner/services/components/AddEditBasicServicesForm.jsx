/* eslint-disable no-unused-vars */
import { Box, Divider, FormControlLabel, Switch, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import {
  basicServicesFormInitVals,
  basicServicesFormValSchema,
  bookingFieldsArrayInitValue,
} from '../utilities/formUtils';
import FormikField from '@/shared/components/form/FormikField';
import FormikSelect from '@/shared/components/form/FormikSelect';
import { momsOptions, priceTypeOptions } from '../utilities/data';
import {
  useAddServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
} from '@/services/private/services';
import { useGetCompanyQuery, useGetCompanyStaffQuery } from '@/services/private/company';
import FormikTimePicker from '@/shared/components/form/FormikTimePicker';
import { border } from '@/styles/common/colors';
import BookingFieldArray from './BookingFieldArray';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import { useGetCategoriesQuery } from '@/services/private/categories';
import FormikMultiSelect from '@/shared/components/form/FormikMultiSelect';
import { getValuesArray } from '@/utilities/helpers';

function AddEditBasicServicesForm({ serviceData = {}, toggleModal = () => {} }) {
  const [initValues, setInitValues] = useState(basicServicesFormInitVals);

  // API HOOKS
  const { data: companyData } = useGetCompanyQuery();

  const { data: userData } = useGetCompanyStaffQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  const [addService, { error, isSuccess }] = useAddServiceMutation();
  const [updateService, { error: editError, isSuccess: isEditSuccess }] = useUpdateServiceMutation();
  useHandleApiResponse(error, isSuccess, 'Service added successfully!');
  useHandleApiResponse(editError, isEditSuccess, 'Service updated successfully!');

  //   TRANSFORMERS

  const categoryOptions = useMemo(() => {
    if (categoriesData) {
      return categoriesData?.results?.map(item => ({
        label: item.name,
        value: item.id,
      }));
    }

    return [];
  }, [categoriesData]);

  const companyOptions = useMemo(() => {
    if (companyData) {
      return companyData?.map(item => ({
        label: item.name,
        value: item.id,
      }));
    }

    return [];
  }, [companyData]);

  const userOptions = useMemo(() => {
    if (userData) {
      return userData?.map(item => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item.id,
      }));
    }

    return [];
  }, [userData]);

  useEffect(() => {
    if (serviceData?.id) {
      setInitValues({
        service_name: serviceData?.service_name || '',
        service_sku: serviceData?.service_sku || '',
        service_description: serviceData?.service_description || '',
        price_type: serviceData?.price_type || '',
        price: serviceData?.price || '',
        category: serviceData?.category || '',
        service_timing: serviceData?.service_timing || '',
        service_provider: getValuesArray(serviceData?.service_providers, 'id') || [],
        company: serviceData?.company || '',
        service_booking_fields:
          serviceData?.service_booking_fields?.length > 0
            ? serviceData?.service_booking_fields
            : [bookingFieldsArrayInitValue],
      });
    }
  }, [serviceData]);

  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={basicServicesFormValSchema}
        onSubmit={async values => {
          if (serviceData?.id) {
            await updateService({ ...values, id: serviceData?.id });
          } else {
            await addService(values);
          }
          toggleModal();
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Grid2 spacing={4} alignItems="start" container>
              <Grid2 container spacing={3} xs={12} md={6}>
                <Grid2 xs={12}>
                  <FormikField
                    name="service_name"
                    label="Service Title"
                    isRequired
                    type="text"
                    placeholder="Service Title"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="service_sku"
                    label="Service SKU"
                    isRequired
                    type="text"
                    placeholder="Service SKU"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikSelect
                    name="category"
                    label="Category"
                    options={categoryOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikSelect
                    name="price_type"
                    label="Price Type"
                    options={priceTypeOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="price"
                    label="Price"
                    type="number"
                    placeholder="Price"
                    isRequired
                    isStack
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={3} xs={12} md={6}>
                <Grid2 xs={12}>
                  <FormikField
                    name="service_timing"
                    label="Service Timing in min"
                    placeholder="eg. 10min"
                    isRequired
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikMultiSelect
                    name="service_provider"
                    label="Service Provider"
                    options={userOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikSelect
                    name="company"
                    label="Company"
                    options={companyOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    label="Description"
                    placeholder="Enter description..."
                    name="service_description"
                    type="textarea"
                    isRequired
                    isStack
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={3} xs={12} md={12}>
                <Grid2 xs={12}>
                  <Divider sx={{ borderColor: border }} className="my-3" />
                  <Typography variant="h6" fontWeight={500}>
                    Booking Fields
                  </Typography>
                </Grid2>
                <Grid2 xs={12}>
                  <BookingFieldArray isBasic name="service_booking_fields" />
                </Grid2>
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

AddEditBasicServicesForm.propTypes = {
  serviceData: PropTypes.object,
  toggleModal: PropTypes.func,
};

export default AddEditBasicServicesForm;
