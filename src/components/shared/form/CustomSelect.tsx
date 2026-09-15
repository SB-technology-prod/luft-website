'use client';

import { ReactNode } from 'react';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectOption } from '@/types/components';

import { cn } from '@/lib/utils';

type CustomInputProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  formItemClassName?: string;
  disabled?: boolean;
  required?: boolean;
  showAllErrors?: boolean;
  labelIcon?: ReactNode;
  labelIconAlign?: 'start' | 'end';
  options: SelectOption[];
};

function CustomSelect({
  fieldName,
  label,
  placeholder,
  className = '',
  formItemClassName = '',
  disabled = false,
  required,
  showAllErrors,
  options,
}: CustomInputProps) {
  const { formState, control } = useFormContext();
  const { isSubmitting, errors } = formState;
  const hasError = errors[fieldName];

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        const hasValue = !!field.value;

        return (
          <FormItem className={formItemClassName}>
            <FormLabel className={cn('ms-4 text-sm text-grayish-900')}>
              {label}
              {required && <span className='ms-1'>&#42;</span>}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled || isSubmitting}
              >
                <SelectTrigger
                  className={cn(
                    'h-12 rounded-2xl border-[1.5px] border-grayish-100 px-4 py-3 text-grayish-900 outline-none transition-all placeholder:text-grayish-400 hover:border-grayish-300 focus-visible:border-grayish-900 focus-visible:ring-0 disabled:border-grayish-100 disabled:bg-grayish-50',
                    {
                      'border-grayish-300': hasValue,
                      'border-error-500 text-error-500 placeholder:text-error-500 hover:border-error-400 focus-visible:border-error-500 focus-visible:text-error-500':
                        hasError,
                    },
                    className,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent position={'popper'}>
                  <SelectGroup>
                    {options.map(({ label, value }) => (
                      <SelectItem
                        key={`Select-${label}`}
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage
              showAllErrors={showAllErrors}
              className='ms-4 text-error-500'
            />
          </FormItem>
        );
      }}
    />
  );
}

export default CustomSelect;
