import moment from 'moment';
import * as Yup from 'yup';

function isTestEndDate(value) {
  const { availability_start_time: startTime } = this.parent;
  return moment(startTime, 'HH:mm:ss').isSameOrBefore(moment(value, 'HH:mm:ss'));
}

export const companyFormInitVals = {
  name: '',
  email: '',
  phone: '',
  address: '',
  company_description: '',
  about_company: '',
  company_images: [],
  website: '',
  availability_days: '',
  availability_start_time: '',
  availability_end_time: '',
  is_active: true
};

export const companyFormValSchema = Yup.object({
  name: Yup.string().max(75, 'Maximum 75 characters allowed').required('Required!'),
  email: Yup.string().required('Required!'),
  phone: Yup.string().required('Required!'),
  address: Yup.string().required('Required!'),
  website: Yup.string().required('Required!'),
  company_description: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
  availability_days: Yup.string().required('Required!'),
  availability_start_time: Yup.string().required('Required'),
  availability_end_time: Yup.string()
    .test('availability_end_time', 'End time must be after start time', isTestEndDate)
    .required('Required'),
  about_company: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
});
