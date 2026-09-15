import { ApiResponse } from '.';

export type GetUserProfileRes = ApiResponse<{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}>;

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  file: File | null;
};

export enum IDENTIFIER_TYPE {
  'Email' = 1,
  'Phone' = 2,
}

export enum OTP_PURPOSE {
  VerifyEmail = 1,
  VerifyPhone = 2,
  ResetPassword = 3,
  UpdateEmail = 4,
  UpdatePhone = 5,
  TwoFactorAuth = 6,
  AdminOnboarding = 7,
  ResetPin = 8,
}

export type ChangeUserIdentifierData = {
  newIdentifier: string;
  type: IDENTIFIER_TYPE;
  otpCode: string;
};

export type SendOtpData = {
  identifier: string;
  otpPurpose: OTP_PURPOSE;
  type: IDENTIFIER_TYPE;
};

export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
};
