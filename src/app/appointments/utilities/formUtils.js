import * as Yup from 'yup';

export const feedbackFormInitialVal = { rating: '', feedback: '' };
export const feedbackFormValSchema = Yup.object({
  rating: Yup.number().required('Required!'),
  feedback: Yup.string().max(255, 'Maximum 255 characters allowed').required('Required!'),
});
