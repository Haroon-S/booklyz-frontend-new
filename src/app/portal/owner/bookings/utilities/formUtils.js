import * as Yup from 'yup';

export const bookingFormInitVals = {
  booking_status: '',
  payment_status: false
};

export const bookingFormValSchema = Yup.object({
  booking_status: Yup.string().required('Required!'),
  payment_status: Yup.string().required('Required!'),
});

export const bookingOptions = [
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Confirmed',
    value: 'Confirmed',
  },
  {
    label: 'Cancelled',
    value: 'Cancelled',
  },
  {
    label: 'Completed',
    value: 'Completed',
  },
];

export const paymentOptions = [
  {
    label: 'Paid',
    value: 'Paid'
  },
  {
    label: 'UnPaid',
    value: 'UnPaid',
  },
];
