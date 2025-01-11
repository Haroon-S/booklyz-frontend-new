'use client';

import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

function ActionBtns({ initialValues, submitText, resetText, disableSubmit }) {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext();

  const { isSubmitting, resetForm, touched, errors, setErrors } = formik;

  useEffect(() => {
    if (errors?.detail) {
      enqueueSnackbar(errors.detail, { variant: 'error' });
      setErrors({ ...errors, detail: '' });
    }
  }, [errors]);

  return (
    <Stack direction="row" gap={2}>
      <Button variant="contained" size="small" type="submit" disabled={isSubmitting || disableSubmit}>
        {isSubmitting && <CircularProgress size={20} />}
        {submitText}
      </Button>

      <Button
        variant="contained"
        size="small"
        type="button"
        onClick={() => {
          resetForm(initialValues);
        }}
        disabled={!touched || isSubmitting}
      >
        {resetText}
      </Button>
    </Stack>
  );
}

ActionBtns.propTypes = {
  initialValues: PropTypes.object,
  submitText: PropTypes.string,
  resetText: PropTypes.string,
  disableSubmit: PropTypes.bool,
};

ActionBtns.defaultProps = {
  initialValues: null,
  submitText: 'Save',
  resetText: 'Clear',
  disableSubmit: false,
};

export default ActionBtns;