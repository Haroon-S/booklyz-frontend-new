import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, useFormikContext } from 'formik';
import { Button, Divider, Stack } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { border } from '@/styles/common/colors';
import { availabilityDaysOptions } from '../../utilities/data';
import FormikTimePicker from '@/shared/components/form/FormikTimePicker';
import { workScheduleFormArrayInitVals } from '../../utilities/formUtils';
import FormikSelect from '@/shared/components/form/FormikSelect';

function ScheduleFieldArray({ name }) {
  const { values } = useFormikContext();

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <Stack gap={3} divider={<Divider sx={{ borderColor: border }} />}>
          {values[name].length > 0 &&
            values[name].map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid2 rowSpacing={2} columnSpacing={4} container>
                <Grid2 xs={12} md={6}>
                  <FormikSelect
                    name={`${name}.${index}.day`}
                    label="Availability Days"
                    isRequired
                    placeholder="Select Status"
                    options={availabilityDaysOptions}
                    isStack
                    isPortal
                  />
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <Stack direction="row" justifyContent="space-between" alignItems="end" gap={1}>
                    <FormikTimePicker
                      label="Break Start Time"
                      name={`${name}.${index}.start_break_time`}
                      isRequired
                      isStack
                    />
                    <Remove color="disabled" className="mb-2" />
                    <FormikTimePicker
                      label="Break End Time"
                      name={`${name}.${index}.end_break_time`}
                      isRequired
                      isStack
                    />
                  </Stack>
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <FormikTimePicker
                    label="Start Time"
                    name={`${name}.${index}.start_time`}
                    isRequired
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <FormikTimePicker label="End Time" name={`${name}.${index}.end_time`} isRequired isStack />
                </Grid2>
                <Grid2 xs={12}>
                  <Stack direction="row" justifyContent="end">
                    <Button
                      sx={{ marginLeft: 'auto', bgcolor: theme => theme.palette.action.hover }}
                      color="error"
                      disabled={values[name].length === 1}
                      onClick={() => remove(index)}
                      size="small"
                    >
                      Discard
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            ))}
          <Stack>
            <Button
              sx={{ bgcolor: theme => theme.palette.action.hover }}
              startIcon={<Add />}
              size="small"
              type="button"
              className="w-25 mx-auto"
              onClick={() => push(workScheduleFormArrayInitVals)}
            >
              Add more
            </Button>
          </Stack>
        </Stack>
      )}
    </FieldArray>
  );
}

ScheduleFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ScheduleFieldArray;
