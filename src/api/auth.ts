import {
  LoginFormData,
  ResetPasswordFormData,
  SetRegisteredUserPasswordFormData,
  type SignupFormData,
  ValidateForgetPasswordOTPFormData,
  VerifyOtpPreregisterFormData,
} from '@/types/auth';

import { apiFetch } from '@/utils/api';

export const sendOtpPreregister = async (userData: SignupFormData) =>
  apiFetch(
    'api/auth/register/send-otp-preregister',
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const resendOtpPreregister = async (userData: SignupFormData) =>
  apiFetch(
    'api/auth/register/resend-otp-preregister',
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const verifyOtpPreregister = async (
  virificationData: VerifyOtpPreregisterFormData,
) =>
  apiFetch(
    'api/auth/register/validate-preregister',
    {
      method: 'POST',
      body: JSON.stringify(virificationData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const setRegisteredUserPassword = async (
  passwordData: SetRegisteredUserPasswordFormData,
) =>
  apiFetch(
    'api/auth/register/complete-register',
    {
      method: 'POST',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const sendOtpForgetPassword = async (email: string) =>
  apiFetch(
    'api/auth/send-otp',
    {
      method: 'POST',
      body: JSON.stringify({
        identifier: email,
        type: 1,
        otpPurpose: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const validateForgetPasswordOtp = async ({
  email,
  otp,
}: ValidateForgetPasswordOTPFormData) =>
  apiFetch(
    'api/auth/validate-otp',
    {
      method: 'POST',
      body: JSON.stringify({
        identifier: email,
        code: otp,
        type: 1,
        otpPurpose: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const resetPassword = async (resetPasswordData: ResetPasswordFormData) =>
  apiFetch(
    'api/auth/reset-password',
    {
      method: 'POST',
      body: JSON.stringify(resetPasswordData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const login = async (credentials: LoginFormData) =>
  apiFetch(
    'api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        emailOrPhone: credentials.email,
        password: credentials.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );

export const logout = async (token: string) =>
  apiFetch(
    'api/auth/logout',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
