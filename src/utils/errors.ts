import { ValidationErrorApiResponse } from '@/types';

export const concatErrors = (res: ValidationErrorApiResponse) => {
  const errorString = Object.values(res.errors).flat().join('\n');
  return errorString;
};

// apiFetch puts the API status code on Error.cause
export const isConflictError = (error: unknown) =>
  error instanceof Error && error.cause === 409;
