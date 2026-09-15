import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { cn, handleOnlyNumbersKeyDown } from '@/lib/utils';

type CustomOtpInputProps = {
  fieldName: string;
  numOfDigits: number;
  label?: string;
  disabled?: boolean;
};

export default function CustomOtpInput({
  numOfDigits,
  fieldName,
  label,
  disabled,
}: CustomOtpInputProps) {
  const { formState, control } = useFormContext();
  const { isSubmitting, errors } = formState;
  const hasError = errors[fieldName];

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className={cn('ms-4 text-sm text-grayish-900')}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <InputOTP
              maxLength={numOfDigits}
              disabled={isSubmitting || disabled}
              className='!w-full'
              onKeyDown={handleOnlyNumbersKeyDown}
              {...field}
            >
              <InputOTPGroup
                dir='ltr'
                style={{ direction: 'ltr' }}
                className='flex items-center gap-2 px-0.5'
              >
                {Array.from({ length: numOfDigits }).map((_, i) => {
                  const fieldHasValue = field.value[i];
                  return (
                    <InputOTPSlot
                      key={'digit' + i}
                      index={i}
                      className={cn(
                        'size-10 rounded-lg border-[1.4px] text-lg font-medium text-grayish-900 md:size-14 lg:text-2xl',
                        {
                          'border-grayish-900 text-grayish-900': fieldHasValue,
                          'border-error-500 text-error-500': hasError,
                        },
                      )}
                    />
                  );
                })}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage className='ms-4 text-error-500' />
        </FormItem>
      )}
    />
  );
}
