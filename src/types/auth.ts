import { ApiResponse } from '.';

export type SignupFormData = {
  email: string;
  firstName: string;
  lastName: string;
};
export type UserSignupData = SignupFormData & {
  registrationKey: string;
};

export type SendOtpPreregisterResponse = ApiResponse<{
  email: string;
  message: string;
  otpAlreadyExists: boolean;
  expiresAt: string;
  registrationKey: string;
}>;

export type VerifyOtpPreregisterResponse = ApiResponse<{
  registrationKey: string;
}>;

export type VerifyOtpPreregisterFormData = {
  registrationKey: string;
  code: string;
  identifier: string;
  type: number;
  purpose: number;
};

export type SetRegisteredUserPasswordFormData = {
  password: string;
  registrationKey: string;
};

export type AuthUserApiResponse = {
  userId: string;
  email: string;
  phone: string;
  userName: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  profilePicture: string;
  roles: string[];
  isVerified: boolean;
  hasPin: boolean;
};

export type SetRegisteredPasswordResponse = ApiResponse<AuthUserApiResponse>;

export type ForgetPasswordFormData = {
  email: string;
};

export type SendOTPForgetPasswordResponse = ApiResponse<undefined>;

export type ValidateForgetPasswordOTPFormData = {
  otp: string;
  email: string;
};

export type ValidateForgetPasswordOTPResponse = ApiResponse<{
  validationKey: string;
}>;

export type ResetPasswordFormData = {
  newPassword: string;
  validationKey: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};
