import {
  ChangeUserIdentifierData,
  ProfileFormData,
  SendOtpData,
} from '@/types/settings';

import { apiFetch } from '@/utils/api';

export const getProfileData = () => apiFetch('api/auth/view-profile');

export const updateUserProfile = (data: ProfileFormData) => {
  const formData = new FormData();

  (Object.keys(data) as (keyof ProfileFormData)[]).forEach((key) => {
    let value = data[key];

    if (typeof value === 'string') {
      value = value.trim();
    }

    if (value !== undefined && value !== null) {
      formData.set(key, value as string | Blob);
    }
  });

  return apiFetch('api/auth/UpdateUserProfile', {
    body: formData,
    method: 'PUT',
  });
};

export const sendOtp = (data: SendOtpData) => {
  return apiFetch('api/auth/send-otp', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const resendOtp = (data: SendOtpData) => {
  return apiFetch('api/auth/send-otp', {
    body: JSON.stringify({ ...data, isResend: true }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const changeUserIdentifier = (data: ChangeUserIdentifierData) => {
  return apiFetch('api/auth/update-email-or-phone', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const changeUserPassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return apiFetch('api/auth/change-password', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const verifyUserPassword = (password: string) => {
  return apiFetch('api/auth/verify-password', {
    body: JSON.stringify({ password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
