import { useState } from 'react';

import { addDays, format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
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

import { useDirection } from '@/hooks/useDirection';

import { cn } from '@/lib/utils';

type CustomCalenderProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  labelClassName?: string;
  buttonClassName?: string;
  iconShow?: boolean;
  chevronShow?: boolean;
};

const CustomRangeCalenderInput = ({
  fieldName,
  label,
  placeholder,
  className,
  labelClassName,
  buttonClassName,
  iconShow = true,
  chevronShow = false,
}: CustomCalenderProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const direction = useDirection();
  const locale = direction === 'rtl' ? ar : enUS;
  const [selectingEnd, setSelectingEnd] = useState(false);
  const selectEndDateText =
    direction === 'rtl' ? 'اختر تاريخ المغادرة' : 'Select end date';

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const range = field.value as DateRange | undefined;

        const displayValue =
          range?.from && range?.to
            ? `${format(range.from, 'd MMM yyyy', { locale })} - ${format(range.to, 'd MMM yyyy', { locale })}`
            : range?.from
              ? `${format(range.from, 'd MMM yyyy', { locale })} - ${selectEndDateText}`
              : '';

        return (
          <FormItem className={cn('flex flex-col min-w-0', className)}>
            <FormLabel
              className={cn(
                'text-sm font-semibold text-grayish-900',
                labelClassName,
              )}
            >
              {label}
            </FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="link"
                    type="button"
                    className={cn(
                      'm-0 flex h-auto w-full min-w-0 items-center justify-between p-0 text-start font-normal hover:no-underline focus-visible:ring-0',
                      buttonClassName,
                    )}
                    disabled={isSubmitting}
                  >
                    <span
                      className={cn(
                        'block w-full min-w-0 truncate text-start text-sm font-semibold',
                        displayValue ? 'text-grayish-900' : 'text-grayish-400',
                      )}
                      title={displayValue || placeholder}
                    >
                      {displayValue || placeholder}
                    </span>

                    {iconShow && (
                      <CalendarIcon className="ms-2 h-4 w-4 shrink-0 text-grayish-500 opacity-50" />
                    )}
                    {chevronShow && (
                      <ChevronDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  locale={locale}
                  dir={direction}
                  mode="range"
                  selected={range}
                  onSelect={(newRange, selectedDay) => {
                    if (!selectingEnd || !range?.from) {
                      field.onChange({
                        from: selectedDay,
                        to: addDays(selectedDay, 1),
                      });
                      setSelectingEnd(true);
                      return;
                    }

                    if (selectedDay > range.from) {
                      field.onChange({
                        from: range.from,
                        to: selectedDay,
                      });
                      setSelectingEnd(false);
                    } else {
                      field.onChange({
                        from: selectedDay,
                        to: addDays(selectedDay, 1),
                      });
                      setSelectingEnd(true);
                    }
                  }}
                  formatters={{
                    formatCaption: (month) => format(month, 'MMM yyyy', { locale }),
                  }}
                  initialFocus
                  disabled={{ before: new Date() }}

                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomRangeCalenderInput;
