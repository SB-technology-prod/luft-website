'use client';
import { ComponentProps, ReactNode, useEffect } from 'react';

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import CustomInput from './CustomInput';

import { cn } from '@/lib/utils';

type CustomInputWithIconProps = ComponentProps<typeof CustomInput> & {
  icon?: ReactNode;
  iconAlign?:
    | 'inline-start'
    | 'inline-end'
    | 'block-start'
    | 'block-end'
    | null
    | undefined;
};

function CustomInputWithIcon({
  fieldName,
  label,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString = false,
  required,
  icon,
  iconAlign,
  showAllErrors,
  onKeyDown,
  autoFocus,
}: CustomInputWithIconProps) {
  const { formState, control, watch } = useFormContext();
  const { isSubmitting, errors } = formState;
  const hasError = errors[fieldName];
  const hasValue = watch(fieldName);

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

    field.onChange(inputValue);
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
            <InputGroup
              className={cn(
                'h-12 rounded-2xl border-[1.5px] border-grayish-100 px-4 py-3 text-grayish-900 outline-none transition-all placeholder:text-grayish-400 hover:border-grayish-300 focus-visible:ring-0 has-[[data-slot=input-group-control]:disabled]:border-grayish-100 has-[[data-slot=input-group-control]:disabled]:bg-grayish-50',
                'has-[[data-slot=input-group-control]:focus-visible]:border-grayish-900',
                {
                  'border-grayish-300': hasValue,
                  'border-error-500 text-error-500 placeholder:text-error-500 hover:border-error-400 has-[[data-slot=input-group-control]:focus-visible]:border-error-500 has-[[data-slot=input-group-control]:focus-visible]:text-error-500':
                    hasError,
                },
                className,
              )}
            >
              <InputGroupInput
                placeholder={placeholder}
                type={type}
                disabled={isSubmitting || disabled}
                className={cn('px-2 placeholder:text-grayish-400', {
                  'placeholder:text-error-500': hasError,
                })}
                {...field}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, field)
                }
                onKeyDown={onKeyDown}
                autoFocus={autoFocus}
              />
              {icon && (
                <InputGroupAddon
                  className='p-0'
                  align={iconAlign}
                >
                  {icon}
                </InputGroupAddon>
              )}
            </InputGroup>
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

export default CustomInputWithIcon;
