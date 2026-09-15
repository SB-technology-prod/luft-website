import { ValidationErrorApiResponse } from '@/types';

export const concatErrors = (res: ValidationErrorApiResponse) => {
  const errorString = Object.values(res.errors).flat().join('\n');
  return errorString;
};
