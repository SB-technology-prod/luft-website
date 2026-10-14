import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

type CustomCalenderProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  iconShow?: boolean;
};

const CustomCalenderInput = ({
  fieldName,
  label,
  placeholder,
  className,
  iconShow = true,
}: CustomCalenderProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel className='text-sm font-semibold text-grayish-900'>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='link'
                  className={cn(
                    'h-[48px] rounded-2xl !text-start font-normal p-0 m-0',
                    field.value ? 'text-foreground' : 'text-muted-foreground',
                  )}
                  disabled={isSubmitting}
                >
                  {field.value ? (
                    <span className='text-start w-full'>{format(field.value, 'PPP')}</span>
                  ) : (
                    <span className='text-start w-full'>{placeholder}</span>
                  )}
                  {
                    iconShow &&
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  }
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomCalenderInput;