import PropTypes from 'prop-types';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { customerFormInitVals, customerFormValSchema } from '../utilities/formUtils';
import Grid2 from '@mui/material/Unstable_Grid2';
import FormikField from '@/shared/components/form/FormikField';
import { useAddNewCustomerMutation } from '@/services/private/company';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';

function AddCustomerModal({ toggleModal = () => {} }) {
  const [addNewCustomer, { error, isSuccess }] = useAddNewCustomerMutation();
  useHandleApiResponse(error, isSuccess, 'New Customer Added');

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={customerFormInitVals}
        validationSchema={customerFormValSchema}
        onSubmit={async values => {
          const profile = {
            first_name: values?.first_name,
            last_name: values?.last_name,
          };
          const payload = {
            profile,
            username: values?.username,
            email: values?.email,
            user_type: values?.user_type,
          };
          const resp = await addNewCustomer(payload);
          if (!resp?.error) {
            toggleModal();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid2 spacing={4} container>
              <Grid2 xs={6}>
                <FormikField
                  name="first_name"
                  label="First Name"
                  isRequired
                  type="text"
                  placeholder="First Name"
                  isStack
                />
              </Grid2>

              <Grid2 xs={6}>
                <FormikField
                  name="last_name"
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                  isRequired
                  isStack
                />
              </Grid2>

              <Grid2 xs={6}>
                <FormikField
                  name="username"
                  label="Username"
                  placeholder="Type your username"
                  type="text"
                  isRequired
                  isStack
                />
              </Grid2>

              <Grid2 xs={6}>
                <FormikField
                  name="email"
                  label="Email"
                  placeholder="Type your Email"
                  type="text"
                  isRequired
                  isStack
                />
              </Grid2>
            </Grid2>
            <Box className="flex w-full items-end justify-end gap-3" mt={3}>
              <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

AddCustomerModal.propTypes = {
  toggleModal: PropTypes.number,
};

export default AddCustomerModal;
