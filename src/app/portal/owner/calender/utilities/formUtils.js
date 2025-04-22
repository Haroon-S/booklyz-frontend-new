import * as yup from 'yup';

export const bookingFormInitVals = {
  user: '',
  staff: '',
  service: '',
  booking_date: '',
  phone: '',
  booking_description: '',
  payment_type: 'on_the_spot',
};

export const bookingFormValSchema = yup.object({
  user: yup.string().required('Required'),
  staff: yup.string().required('Required'),
  service: yup.string().required('Required'),
  booking_date: yup.string().required('Required'),
  phone: yup.string().required('Required'),
  booking_description: yup.string().required('Required'),
});

export const customerFormInitVals = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  user_type: 'client'
};

export const customerFormValSchema = yup.object({
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  username: yup.string().required('Required'),
  email: yup.string().required('Required'),
});