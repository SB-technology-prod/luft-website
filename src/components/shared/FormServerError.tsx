import { ReactNode } from 'react';

import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

type FormServerErrorProps = {
  children: ReactNode;
  className?: string;
};

export default function FormServerError({
  children,
  className,
}: FormServerErrorProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  if (isSubmitting) return;

  return (
    <p
      className={cn(
        'whitespace-pre-line border-s-4 border-error-500 bg-error-50 p-2 font-semibold text-error-500 max-md:text-sm',
        className,
      )}
    >
      {children}
    </p>
  );
}
