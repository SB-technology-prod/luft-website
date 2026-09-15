import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

type CustomTextarea = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  formItemClassName?: string;
};

function CustomTextarea({
  fieldName,
  label = '',
  placeholder = '',
  className = '',
  disabled = false,
  required = false,
  formItemClassName = '',
}: CustomTextarea) {
  const form = useFormContext();
  const { isSubmitting, errors } = form.formState;
  const hasError = errors[fieldName];

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn(formItemClassName)}>
          <FormLabel className={cn('ms-4 text-sm text-grayish-900')}>
            {label}
            {required && <span className='ms-1'>&#42;</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn(
                'min-h-48 resize-none rounded-2xl border-[1.5px] border-grayish-100 px-4 py-4 text-grayish-900 outline-none transition-all placeholder:text-grayish-400 hover:border-grayish-300 focus-visible:border-grayish-900 focus-visible:ring-0 disabled:border-grayish-100 disabled:bg-grayish-50',
                {
                  'border-grayish-300': field.value,
                  'border-error-500 text-error-500 placeholder:text-error-500 hover:border-error-400 focus-visible:border-error-500 focus-visible:text-error-500':
                    hasError,
                },
                className,
              )}
              {...field}
              disabled={isSubmitting || disabled}
            />
          </FormControl>
          <FormMessage className='ms-4 text-error-500' />
        </FormItem>
      )}
    />
  );
}

export default CustomTextarea;
