import * as Yup from 'yup';

export const slotFormInitVals = {
  date: '',
  time: '',
  staff: '',
};
export const slotFormValSchema = Yup.object({
  date: Yup.date(),
  time: Yup.string(),
  staff: Yup.string().required('Required'),
});
