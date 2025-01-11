/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import moment from 'moment';
import { useLazyGetServiceTimeSlotsQuery } from '@/services/private/services';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import { slotFormInitVals, slotFormValSchema } from './data';
import FormikDatePicker from '@/shared/components/form/FormikDatePicker';
import FormikSelect from '@/shared/components/form/FormikSelect';
import { border } from '@/styles/common/colors';

function RadioLabel({ name, image, designation }) {
  return (
    <Box className="w-full flex gap-3 items-center">
      <Avatar src={image} sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
      <Typography variant="h6" className="font-semibold">
        {name} <span className=" text-sm text-grey">({designation})</span>
      </Typography>
    </Box>
  );
}
function ChooseTimeForm({ serviceData, serviceId, companyId }) {
  const [getTimeSlotData, { data: timeSlotData = [] }] = useLazyGetServiceTimeSlotsQuery();
  const [selectedDay, setSelectedDay] = useState('');
  const router = useRouter();
  const formikRef = useRef();

  const timeSlotOptions = useMemo(() => {
    if (timeSlotData && selectedDay) {
      const daysSlots = timeSlotData?.filter(item => item.day === selectedDay);

      return daysSlots[0]?.staff_slots?.map(item => ({
        label: (
          <Box>
            <Typography variant="body2" display="block">
              {`${moment(item?.start_time, 'HH:mm:ss').format('hh:mm a')} to ${moment(item?.end_time, 'HH:mm:ss').format('hh:mm a')}`}
            </Typography>
          </Box>
        ),
        value: JSON.stringify({ startTime: item?.start_time, endTime: item?.end_time }),
      }));
    }

    return [];
  }, [timeSlotData, selectedDay]);

  const handleStaffAndDateChange = async staff => {
    if (staff) {
      await getTimeSlotData({ staff });
    }
  };

  const handleSelectedDay = newValue => {
    if (newValue) {
      setSelectedDay(moment(newValue).format('dddd'));
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={slotFormInitVals}
      validationSchema={slotFormValSchema}
      onSubmit={async values => {
        const { startTime, endTime } = JSON.parse(values.time);

        router.push(
          `/booking/checkout?service=${serviceId}&company=${companyId}&date=${values.date}&start_time=${startTime}&end_time=${endTime}`
        );
      }}
    >
      {({ isSubmitting, values, setFieldValue, resetForm }) => (
        <Form>
          <Grid2 container columnSpacing={{ xs: 0, md: 20 }} mt={5}>
            <Grid2 xs={12} md={7}>
              <Typography variant="h5" className="font-bold">
                Choose a time
              </Typography>
              <Box className="mt-4">
                <Stack gap={4}>
                  <FormikDatePicker
                    label="Booking Date"
                    name="date"
                    onChange={newValue => handleSelectedDay(newValue)}
                    disabled={!values.staff}
                    disablePast
                    isRequired
                    isStack
                  />

                  <FormikSelect
                    name="time"
                    label="Slot"
                    options={timeSlotOptions}
                    disabled={!values.staff || !values.date}
                    placeholder="Select"
                    isRequired
                    isStack
                    isSlots
                  />
                  {/* <FormikTimePicker label="Choose Time" name="time" isRequired isStack /> */}
                </Stack>
                <Box className="flex w-100 items-end justify-end gap-3" mt={3}>
                  <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl w-full" />
                </Box>
              </Box>
            </Grid2>
            <Grid2 className=" mt-10 md:mt-0" xs={12} md={5}>
              <Typography variant="body1" className="text-grey font-semibold">
                You have chosen:
              </Typography>
              <Divider sx={{ borderColor: border }} className="my-3" />

              <Box>
                <Typography variant="body1" className="text-grey font-semibold">
                  {serviceData?.service_name}
                </Typography>
                <Box className="mt-2 flex justify-between item-baseline gap-3">
                  <Typography variant="body1" className="text-grey font-semibold">
                    {serviceData?.service_timing}min,{' '}
                    <span className="text-sky-300">DKK {serviceData?.price}</span>
                  </Typography>
                </Box>
                <Box className="mt-6 w-full flex flex-col gap-3">
                  <Typography variant="body1" className="text-grey font-semibold required">
                    Choose Employee
                  </Typography>
                  <FormControl className="w-full">
                    <RadioGroup
                      aria-labelledby="controlled-radio-buttons-group"
                      name="staff"
                      onChange={e => {
                        setFieldValue('staff', e.target.value);
                        handleStaffAndDateChange(e.target.value);
                      }}
                      className="w-full flex flex-col gap-4"
                    >
                      {serviceData?.service_providers?.map(user => (
                        <Box className="w-full flex items-center">
                          <FormControlLabel
                            value={user?.id}
                            className="hover:bg-gray-100 w-full rounded-xl py-3"
                            control={<Radio />}
                            label={(
                              <RadioLabel
                                name={`${user?.first_name} ${user?.last_name}`}
                                designation={user?.designation}
                                image={user?.image}
                              />
                            )}
                          />
                        </Box>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Form>
      )}
    </Formik>
  );
}

ChooseTimeForm.propTypes = {
  serviceData: PropTypes.object.isRequired,
  serviceId: PropTypes.number.isRequired,
  companyId: PropTypes.number.isRequired,
};

export default ChooseTimeForm;
