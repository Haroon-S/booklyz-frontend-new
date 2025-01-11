import * as yup from 'yup';

export const bookingFormInitVals = {
  phone: '',
  booking_description: '',
  payment_type: '',
};

export const bookingFormValSchema = yup.object({
  phone: yup.string().required('Required'),
  booking_description: yup.string().required('Required'),
  payment_type: yup.string().required('Required'),
});
