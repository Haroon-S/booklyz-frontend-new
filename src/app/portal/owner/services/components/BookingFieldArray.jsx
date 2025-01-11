import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, useFormikContext } from 'formik';
import { Box, Button, Divider, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import FormikField from '@/shared/components/form/FormikField';
import { bookingFieldsArrayInitValue } from '../utilities/formUtils';
import FormikCheckbox from '@/shared/components/form/FormikCheckbox';
import { border } from '@/styles/common/colors';

function BookingFieldArray({ name, isBasic = false }) {
  const { values } = useFormikContext();
  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <Stack gap={3} divider={<Divider sx={{ borderColor: border }} className="my-3" />}>
          {values[name].length > 0 &&
            values[name].map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box className={isBasic ? ' grid grid-cols-3 gap-4 items-end' : ' flex flex-col justify-center gap-6'}>
                <FormikField
                  name={`${name}.${index}.field_name`}
                  label="Field Name"
                  type="text"
                  placeholder="Field Name"
                  isRequired
                  isStack
                />
                <FormikField
                  name={`${name}.${index}.field_type`}
                  label="Field Type"
                  type="text"
                  placeholder="Field Type"
                  isRequired
                  isStack
                />
                <Box className=" flex justify-between gap-5">
                  <FormikCheckbox muiSize="small" label="Is Required" name={`${name}.${index}.is_required`} />
                  <Button
                    sx={{ marginLeft: 'auto', bgcolor: theme => theme.palette.action.hover }}
                    color="error"
                    disabled={values[name].length === 1}
                    onClick={() => remove(index)}
                    size="small"
                  >
                    Discard
                  </Button>
                </Box>
              </Box>
            ))}
          <Stack>
            <Button
              sx={{ bgcolor: theme => theme.palette.action.hover }}
              startIcon={<Add />}
              size="small"
              type="button"
              className="w-25 mx-auto"
              onClick={() => push(bookingFieldsArrayInitValue)}
            >
              Add more
            </Button>
          </Stack>
        </Stack>
      )}
    </FieldArray>
  );
}

BookingFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
  isBasic: PropTypes.bool,
};

export default BookingFieldArray;
