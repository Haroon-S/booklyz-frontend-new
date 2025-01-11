import React from 'react';
import { Box, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { feedbackFormInitialVal, feedbackFormValSchema } from '../utilities/formUtils';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import FormikField from '@/shared/components/form/FormikField';
import FormikRating from '@/shared/components/form/FormikRating';

function FeedbackForm({ service = null, toggleModal, handler }) {
  const { user } = useSelector(state => state.auth);
  return (
    <Box className=" mt-8">
      <Formik
        enableReinitialize
        initialValues={feedbackFormInitialVal}
        validationSchema={feedbackFormValSchema}
        onSubmit={async values => {
          const resp = await handler({ ...values, service, user: user?.profile?.id });
          if (!resp?.error) {
            toggleModal();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack direction="column" gap="24px">
              <FormikRating name="rating" label="Rating" isStack isRequired />

              <FormikField
                label="Description"
                placeholder="Enter description..."
                name="feedback"
                type="textarea"
                isRequired
                isStack
              />
            </Stack>

            <Stack gap={1.5} className="flex-row w-100 align-items-center" mt={3}>
              <SubmitBtn label="Submit" isLoading={isSubmitting} />
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

FeedbackForm.propTypes = {
  service: PropTypes.number,
  toggleModal: PropTypes.func.isRequired,
  handler: PropTypes.func.isRequired,
};

export default FeedbackForm;
