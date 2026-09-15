'use client';
import React, { useState } from 'react';

import AlreadyHasAccountMsg from './_components/AlreadyHasAccountMsg';
import CreateAccountForm from './_components/CreateAccountForm';
import HavingTroubleToSignup from './_components/HavingTroubleToSignup';
import SetRegisteredUserPassword from './_components/SetRegisteredUserPassword';
import VerifySignupOTPForm from './_components/VerifySignupOTPForm';

import { UserSignupData } from '@/types/auth';

export default function CreateAccountPage() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [userData, setUserData] = useState<UserSignupData>({
    firstName: '',
    lastName: '',
    email: '',
    registrationKey: '',
  });

  const retrySignup = () => {
    setIsOtpSent(false);
    setIsOtpVerified(false);
  };

  if (!isOtpSent)
    return (
      <div className='flex flex-col'>
        <CreateAccountForm
          setIsOtpSent={setIsOtpSent}
          setUserData={setUserData}
        />
        <AlreadyHasAccountMsg />
      </div>
    );

  if (!isOtpVerified)
    return (
      <div className='flex flex-col'>
        <VerifySignupOTPForm
          setIsOtpVerified={setIsOtpVerified}
          userData={userData}
        />
        <HavingTroubleToSignup onClick={retrySignup} />
      </div>
    );

  return (
    <div className='flex flex-col'>
      <SetRegisteredUserPassword registrationKey={userData.registrationKey} />
      <HavingTroubleToSignup onClick={retrySignup} />
    </div>
  );
}
