import { addDays, format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
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
import { useState } from 'react';

type CustomCalenderProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  iconShow?: boolean;
};

const CustomRangeCalenderInput = ({
  fieldName,
  label,
  placeholder,
  className,
  iconShow = true,
}: CustomCalenderProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const direction = useDirection();
  const locale = direction === 'rtl' ? ar : enUS;
  const [selectingEnd, setSelectingEnd] = useState(false);
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
              ? `${format(range.from, 'd MMM yyyy', { locale })} - Select end date`
              : '';

        return (
          <FormItem className={cn('flex flex-col', className)}>
            <FormLabel className="text-sm font-semibold text-grayish-900">
              {label}
            </FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="link"
                    className={cn(
                      'm-0 h-[48px] w-full justify-start rounded-2xl p-0 text-start font-normal',
                      !range?.from && 'text-muted-foreground',
                    )}
                    disabled={isSubmitting}
                  >
                    <span className="w-full text-start font-semibold text-grayish-400 pt-1.5">
                      {displayValue || placeholder}
                    </span>

                    {iconShow && (
                      <CalendarIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
