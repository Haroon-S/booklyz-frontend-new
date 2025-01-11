/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import FormikField from '@/shared/components/form/FormikField';
import FormikSelect from '@/shared/components/form/FormikSelect';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import { useAddJournalMutation, useGetOwnersQuery, useUpdateJournalMutation } from '@/services/private/journals';
import { journalFormInitVals, journalFormValSchema } from '../../utilities/formUtils';

function AddEditJournalForm({ journalData = null, toggleModal = () => {} }) {
  const [initValues, setInitValues] = useState(journalFormInitVals);

  const { data: ownerData } = useGetOwnersQuery();

  const [addJournal, { error, isSuccess }] = useAddJournalMutation();
  const [updateJournal, { error: editError, isSuccess: isEditSuccess }] = useUpdateJournalMutation();
  useHandleApiResponse(error, isSuccess, 'Journal added successfully!');
  useHandleApiResponse(editError, isEditSuccess, 'Journal updated successfully!');

  const ownersOptions = useMemo(() => (ownerData?.length > 0 ? ownerData.map(option => ({
    label: `${option?.first_name} ${option?.last_name} `,
    value: option?.id
  })) : []), [ownerData]);

  useEffect(() => {
    if (journalData) {
      setInitValues({
        ...(journalData || {})
      });
    }
  }, [journalData]);
  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={journalFormValSchema}
        onSubmit={async values => {
          if (journalData) {
            await updateJournal(values);
          } else {
            await addJournal(values);
          }
          toggleModal();
        }}
      >
        {({ isSubmitting, values, setFieldValue, resetForm }) => (
          <Form>
            <Grid2 spacing={4} container>
              <Grid2 container rowSpacing={4} xs={12} md={6}>
                <Grid2 xs={12}>
                  <FormikField name="name" label="Name" isRequired type="text" placeholder="Name" isStack />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="email"
                    label="Email"
                    isRequired
                    type="text"
                    placeholder="Email"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="phone"
                    label="Phone"
                    isRequired
                    type="text"
                    placeholder="phone"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="price"
                    label="Price"
                    isRequired
                    type="number"
                    placeholder="price"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikSelect
                    name="owner"
                    label="Owner"
                    options={ownersOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Grid2>
              </Grid2>
              <Grid2 container rowSpacing={4} xs={12} md={6}>
                <Grid2 xs={12}>
                  <FormikField
                    name="description"
                    label="Journal Description"
                    isRequired
                    type="textarea"
                    placeholder="Journal Description"
                    rows={7}
                    isStack
                  />
                </Grid2>
              </Grid2>
            </Grid2>
            <Box className="flex w-100 items-end justify-end gap-3" mt={3}>
              <SubmitBtn label={journalData ? 'Update' : 'Save'} isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

AddEditJournalForm.propTypes = {
  journalData: PropTypes.object,
  toggleModal: PropTypes.func
};

export default AddEditJournalForm;
