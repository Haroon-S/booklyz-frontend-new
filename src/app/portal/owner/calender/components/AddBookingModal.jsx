import { useGetServiceQuery, useLazyGetServiceTimeSlotsQuery } from '@/services/private/services';
import PropTypes from 'prop-types';
import FormikSelect from '@/shared/components/form/FormikSelect';
import { Box, Modal, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { bookingFormInitVals, bookingFormValSchema } from '../utilities/formUtils';
import { useGetBookingUserListQuery, useGetCompanyStaffQuery } from '@/services/private/company';
import FormikDatePicker from '@/shared/components/form/FormikDatePicker';
import moment from 'moment';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import CommonSelectBtn from '@/app/common/components/CommonSelectBtn';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import AddCustomerModal from './AddCustomerModal';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import FormikField from '@/shared/components/form/FormikField';
import { useAddBookingMutation } from '@/services/private/calender';

function AddBookingModal({ toggleModalHandler = () => {} }) {
  const [selectedDay, setSelectedDay] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [getTimeSlotData, { data: timeSlotData = [] }] = useLazyGetServiceTimeSlotsQuery();
  const { data } = useGetServiceQuery();
  const { data: customerData } = useGetBookingUserListQuery();
  const { data: userData } = useGetCompanyStaffQuery();

  const [addBooking, { error, isSuccess }] = useAddBookingMutation();
  useHandleApiResponse(error, isSuccess, 'Booking added successfully!');

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const basicServiceOptions = useMemo(() => {
    if (data) {
      return data?.map(item => ({
        label: item.service_name,
        value: item.id,
      }));
    }

    return [];
  }, [data]);

  const userOptions = useMemo(() => {
    if (userData) {
      return userData?.map(item => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item.id,
      }));
    }

    return [];
  }, [userData]);

  const timeSlotOptions = useMemo(() => {
    if (timeSlotData?.length > 0 && selectedDay) {
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

  const modifiedCustomerOptions = useMemo(() => {
    if (customerData?.results?.length > 0) {
      const customerOptions = customerData?.results?.map(item => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item.id,
      }));
      return [
        ...customerOptions,
        {
          value: 'custom-menu-button',
          label: <CommonSelectBtn title="Add Customer" actionFunc={toggleModal} />,
        },
      ];
    }

    return [];
  }, [customerData]);

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
    <Box>
      <Formik
        enableReinitialize
        initialValues={bookingFormInitVals}
        validationSchema={bookingFormValSchema}
        onSubmit={async values => {
          const { startTime, endTime } = JSON.parse(values.time);

          const selectedService = data.find(service => service?.id === values.service);
          
          const payload = {
            ...values,
            start_booking_slot: startTime,
            end_booking_slot: endTime,
            total_price: selectedService?.price,
          };
          
          const resp = await addBooking(payload);
          if (!resp?.error) {
            toggleModalHandler();
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => (
          <Form>
            <Grid2 spacing={4} container>
              <Grid2 xs={12}>
                <FormikSelect
                  name="user"
                  label="Customer"
                  options={modifiedCustomerOptions}
                  placeholder="Select Customer"
                  isRequired
                  isStack
                  isPortal
                />
              </Grid2>
              <Grid2 xs={12}>
                <FormikSelect
                  name="service"
                  label="Services"
                  options={basicServiceOptions}
                  placeholder="Select Service"
                  isRequired
                  isStack
                  isPortal
                />
              </Grid2>
              <Grid2 xs={6}>
                <FormikSelect
                  name="staff"
                  label="User"
                  options={userOptions}
                  onChange={newValue => handleStaffAndDateChange(newValue)}
                  placeholder="Select User"
                  isRequired
                  isStack
                  isPortal
                />
              </Grid2>
              <Grid2 xs={6}>
                <FormikField name="phone" label="Phone" isRequired type="text" placeholder="phone" isStack />
              </Grid2>
              <Grid2 xs={6}>
                <FormikDatePicker
                  label="Booking Date"
                  name="booking_date"
                  onChange={newValue => handleSelectedDay(newValue)}
                  disabled={!values.staff}
                  disablePast
                  isRequired
                  isStack
                />
              </Grid2>
              <Grid2 xs={6}>
                <FormikSelect
                  name="time"
                  label="Slot"
                  options={timeSlotOptions}
                  disabled={!values.staff || !values.booking_date}
                  placeholder="Select"
                  isRequired
                  isStack
                  isSlots
                  isPortal
                />
              </Grid2>
              <Grid2 xs={12}>
                <FormikField
                  name="booking_description"
                  label="Description"
                  isRequired
                  type="textarea"
                  placeholder="Write a message to the business"
                  rows={7}
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
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, width: '700px' }}>
          <ModalHeader title="Booking Details" onClose={toggleModal} />

          <AddCustomerModal toggleModal={toggleModal} />
        </Box>
      </Modal>
    </Box>
  );
}

AddBookingModal.propTypes = {
  toggleModalHandler: PropTypes.number,
};

export default AddBookingModal;
