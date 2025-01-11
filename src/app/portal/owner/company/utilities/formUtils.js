import * as Yup from 'yup';

export const companyFormInitVals = {
  name: '',
  email: '',
  phone: '',
  address: '',
  company_description: '',
  about_company: '',
  company_images: [],
  is_active: true
};

export const companyFormValSchema = Yup.object({
  name: Yup.string().max(75, 'Maximum 75 characters allowed').required('Required!'),
  email: Yup.string().required('Required!'),
  phone: Yup.string().required('Required!'),
  address: Yup.string().required('Required!'),
  company_description: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
  about_company: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
});
