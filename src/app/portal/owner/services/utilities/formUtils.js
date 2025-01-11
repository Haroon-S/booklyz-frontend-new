import * as Yup from 'yup';

export const bookingFieldsArrayInitValue = {
  field_name: '',
  field_type: '',
  is_required: false,
};

export const servicesFormInitVals = {
  service_name: '',
  service_sku: '',
  service_type: 'additional',
  service_description: '',
  basic_service: '',
  price_type: '',
  price: '',
  service_timing: '',
  service_provider: [],
  company: '',
  category: '',
  service_booking_fields: [bookingFieldsArrayInitValue],
};

export const servicesFormValSchema = Yup.object({
  service_name: Yup.string().max(75, 'Maximum 75 characters allowed').required('Required!'),
  service_sku: Yup.string().required('Required!'),
  service_description: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
  basic_service: Yup.string().required('Required!'), 
  price_type: Yup.string().required('Required!'),
  price: Yup.string().required('Required!'),
  service_timing: Yup.string().required('Required!'),
  service_provider: Yup.array().required('Required!'),
  company: Yup.string().required('Required!'),
  category: Yup.string().required('Required!'),
  service_booking_fields: Yup.array().of(
    Yup.object({
      field_name: Yup.string().required('Required'),
      field_type: Yup.string().required('Required'),
      is_required: Yup.boolean(),
    })
  ),
});

export const basicServicesFormInitVals = {
  service_name: '',
  service_sku: '',
  service_type: 'basic',
  service_description: '',
  price_type: '',
  price: '',
  service_timing: '',
  service_provider: [],
  company: '',
  category: '',
  service_booking_fields: [bookingFieldsArrayInitValue],
};

export const basicServicesFormValSchema = Yup.object({
  service_name: Yup.string().max(75, 'Maximum 75 characters allowed').required('Required!'),
  service_sku: Yup.string().required('Required!'),
  service_description: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
  price_type: Yup.string().required('Required!'),
  price: Yup.string().required('Required!'),
  service_timing: Yup.string().required('Required!'),
  service_provider: Yup.array().required('Required!'),
  company: Yup.string().required('Required!'),
  category: Yup.string().required('Required!'),
  service_booking_fields: Yup.array().of(
    Yup.object({
      field_name: Yup.string().required('Required'),
      field_type: Yup.string().required('Required'),
      is_required: Yup.boolean(),
    })
  ),
});
