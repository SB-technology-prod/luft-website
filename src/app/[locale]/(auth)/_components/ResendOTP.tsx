'use client';
import { Dispatch, SetStateAction } from 'react';

import { useTranslations } from 'next-intl';

import { Countdown } from '@/components/shared/Countdown';
import { Button } from '@/components/ui/button';

type ResendOTPMsgProps = {
  onResend: () => void;
  isResending: boolean;
  isResendDisabled: boolean;
  setIsResendDisabled: Dispatch<SetStateAction<boolean>>;
};

export default function ResendOTP({
  isResendDisabled,
  setIsResendDisabled,
  onResend,
  isResending,
}: ResendOTPMsgProps) {
  const t = useTranslations('auth.verifyOTP');

  const otpResendTime = process.env.NEXT_PUBLIC_OTP_RESEND_TIME ?? 1;

  return (
    <div className='flex items-center gap-2 text-sm text-grayish-400'>
      <span>{t('didntGetCode')}</span>

      {isResendDisabled ? (
        <p className=''>
          {t('resendIn')} &nbsp;
          <Countdown
            minutes={+otpResendTime}
            onFinish={() => setIsResendDisabled(false)}
          />
        </p>
      ) : (
        <Button
          variant={'link'}
          className='p-0 text-grayish-900'
          onClick={onResend}
          type='button'
          disabled={isResending}
        >
          {t('resendBtn')}
        </Button>
      )}
    </div>
  );
}
