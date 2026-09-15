'use client';

import { useState } from 'react';

import VerifyOTPForm from '../VerifyOtp';
import VerifyUserPassword from '../VerifyUserPassword';

import RequestOtpForm from './RequestOtpForm';

import { IDENTIFIER_TYPE, OTP_PURPOSE } from '@/types/settings';

export default function ChangePhoneForm() {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [identifier, setIdentifier] = useState('');

  if (!isUserVerified)
    return (
      <VerifyUserPassword
        onSuccess={() => {
          setIsUserVerified(true);
        }}
      />
    );

  if (!isOtpSent)
    return (
      <RequestOtpForm
        setIdentifier={setIdentifier}
        setIsOtpSent={setIsOtpSent}
      />
    );

  return (
    <VerifyOTPForm
      identifier={identifier}
      identifierType={IDENTIFIER_TYPE.Phone}
      otpPurpose={OTP_PURPOSE.UpdatePhone}
    />
  );
}
