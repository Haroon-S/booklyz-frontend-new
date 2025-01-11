/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import useUserContext from '@/customHooks/useUserContext';
import { workScheduleFormInitVals } from '../../utilities/formUtils';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import ScheduleFieldArray from './ScheduleFieldArray';
import {
  useAddCompanyStaffMutation,
  useUpdateCompanyStaffImageMutation,
  useUpdateCompanyStaffMutation,
} from '@/services/private/company';

function WorkScheduleForm() {
  const {
    selectedId,
    setActiveStep,
    setUserData,
    userData,
    setError,
    error: stepError,
    toggleAddModal,
  } = useUserContext();
  const [initValues, setInitValues] = useState(workScheduleFormInitVals);
  const [addUser, { error, isSuccess }] = useAddCompanyStaffMutation();
  const [updateUser, { error: updateError, isSuccess: updateIsSuccess }] = useUpdateCompanyStaffMutation();
  const [updateUserImage] = useUpdateCompanyStaffImageMutation();
  useHandleApiResponse(error, isSuccess, 'Staff added successfully!');
  useHandleApiResponse(updateError, updateIsSuccess, 'Staff update successfully!');

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
        onSubmit={async values => {
          const formData = new FormData();
          if (userData?.image && typeof userData?.image !== 'string') {
            formData.append('image', userData?.image, userData?.image?.name);
          }
          const formDataObject = {};
          formData.forEach((value, key) => {
            formDataObject[key] = value;
          });

          if (selectedId) {
            const updateUserResp = await updateUser({
              ...userData,
              ...values,
              image: undefined,
              id: selectedId,
            });
            await updateUserImage({ formData, id: updateUserResp?.data?.id });
            setUserData({ ...userData, ...values });
            window.scrollTo(0, 0);
            if (updateUserResp?.data) {
              if (stepError) {
                setError(false);
              }
              toggleAddModal();
            }
          } else {
            const addUserResp = await addUser({
              ...userData,
              ...values,
              image: undefined,
            });
            await updateUserImage({ formData, id: addUserResp?.data?.id });
            setUserData({ ...userData, ...values });
            window.scrollTo(0, 0);
            if (addUserResp?.data) {
              if (stepError) {
                setError(false);
              }
              toggleAddModal();
            }
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <ScheduleFieldArray isBasic name="staff_schedule" />
            <Box className="flex w-100 items-end justify-end gap-3" mt={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setActiveStep(1)}
                className=" rounded-3xl text-white"
              >
                Back
              </Button>
              <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default WorkScheduleForm;
