'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';

import { useDirection } from '@/hooks/useDirection';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dir: providedDirection,
  ...props
}: CalendarProps) {
  const localeDirection = useDirection();
  const direction = providedDirection ?? localeDirection;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'relative flex flex-col gap-4',
        month_caption: 'flex h-8 items-center justify-center',
        caption_label: 'text-sm font-medium',
        nav: 'absolute inset-x-3 top-3 flex items-center justify-between z-10',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0',
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex w-full justify-between',
        weekday: 'w-10 rounded-md text-[0.8rem] font-normal text-muted-foreground',
        week: 'mt-2 flex w-full justify-between',
        day: 'relative h-8 w-8 p-0 text-center text-sm',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal',
        ),
        selected: '[&>button]:bg-primary [&>button]:text-primary-foreground',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground',
        outside: 'text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeft
                className={cn(
                  'h-4 w-4',
                  direction === 'rtl' && 'rotate-180',
                  className,
                )}
                {...props}
              />
            );
          }
          return (
            <ChevronRight
              className={cn(
                'h-4 w-4',
                direction === 'rtl' && 'rotate-180',
                className,
              )}
              {...props}
            />
          );
        },
      }}
      dir={direction}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
