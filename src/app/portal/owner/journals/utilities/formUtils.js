import * as Yup from 'yup';

export const journalFormInitVals = {
  name: '',
  email: '',
  phone: '',
  price: '',
  owner: '',
  description: '',
};

export const journalFormValSchema = Yup.object({
  name: Yup.string().max(75, 'Maximum 75 characters allowed').required('Required!').required('Required!'),
  email: Yup.string().required('Required!'),
  phone: Yup.string().required('Required!'),
  price: Yup.string().required('Required!'),
  owner: Yup.string().required('Required!'),
  description: Yup.string().max(250, 'Maximum 250 characters allowed').required('Required!'),
});
