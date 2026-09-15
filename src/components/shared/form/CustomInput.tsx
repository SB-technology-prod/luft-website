'use client';
import { useEffect } from 'react';

import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { InputTrimmer } from '@/utils';

import { cn } from '@/lib/utils';

type CustomInputProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  formItemClassName?: string;
  disabled?: boolean;
  isNumberAsAString?: boolean;
  required?: boolean;
  showAllErrors?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
};

function CustomInput({
  fieldName,
  label,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString = false,
  required,
  showAllErrors,
  onKeyDown,
  autoFocus = false,
}: CustomInputProps) {
  const { formState, control } = useFormContext();
  const { isSubmitting, errors } = formState;
  const hasError = errors[fieldName];

  // Prevent wheel event on number inputs
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if ((event.target as HTMLInputElement).type === 'number') {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle input change based on type
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    const inputValue = event.target.value;

    if (type === 'number') {
      field.onChange(+inputValue);
      return;
    }

    if (isNumberAsAString && !/^\d*$/.test(inputValue)) {
      return;
    }

    field.onChange(InputTrimmer(inputValue));
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className={cn('ms-4 text-sm text-grayish-900')}>
            {label}
            {required && <span className='ms-1'>&#42;</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              disabled={isSubmitting || disabled}
              className={cn(
                'h-12 rounded-2xl border-[1.5px] border-grayish-100 px-4 py-3 text-grayish-900 outline-none transition-all placeholder:text-grayish-400 hover:border-grayish-300 focus-visible:border-grayish-900 focus-visible:ring-0 disabled:border-grayish-100 disabled:bg-grayish-50',
                {
                  'border-grayish-300': field.value,
                  'border-error-500 text-error-500 placeholder:text-error-500 hover:border-error-400 focus-visible:border-error-500 focus-visible:text-error-500':
                    hasError,
                },
                className,
              )}
              {...field}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event, field)
              }
              onKeyDown={onKeyDown}
              autoFocus={autoFocus}
            />
          </FormControl>
          <FormMessage
            showAllErrors={showAllErrors}
            className='ms-4 text-error-500'
          />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
