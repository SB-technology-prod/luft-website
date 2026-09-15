import { ReactNode } from 'react';

import { useFormContext } from 'react-hook-form';

import FormServerError from '@/components/shared/FormServerError';
import SubmitButton from '@/components/shared/SubmitButton';

import { cn } from '@/lib/utils';

type FieldFormLayoutProps = {
  children: ReactNode;
  submitBtnLabel: string;
  serverError?: string;
  title?: string;
  description?: string;
  className?: string;
  onSubmit: () => void;
};

export default function FieldFormLayout({
  children,
  submitBtnLabel,
  serverError,
  title,
  description,
  className,
  onSubmit,
}: FieldFormLayoutProps) {
  const form = useFormContext();
  const { isSubmitting, isDirty, isValid } = form.formState;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className='flex flex-col gap-2'>
        {title && (
          <h6 className='text-2xl font-medium text-grayish-900'>{title}</h6>
        )}
        {description && (
          <p className='text-xl text-grayish-400'>{description}</p>
        )}
      </div>
      <div className='relative flex flex-col gap-4'>{children}</div>
      <div className='flex flex-col gap-2'>
        {serverError && <FormServerError>{serverError}</FormServerError>}

        <SubmitButton
          variant={'default'}
          className='py-3.5 md:h-12'
          type='button'
          disabled={!isValid || !isDirty || isSubmitting}
          isSubmitting={isSubmitting}
          onClick={onSubmit}
        >
          {submitBtnLabel}
        </SubmitButton>
      </div>
    </div>
  );
}
