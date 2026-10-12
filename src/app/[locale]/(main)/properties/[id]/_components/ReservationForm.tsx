'use client';

import { useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import {
  addDays,
  differenceInCalendarDays,
  format,
  isBefore,
  isValid,
  parseISO,
  startOfDay,
} from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { Minus, Plus } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

import { Modal } from '@/components/shared/Modal';
import Spinner from '@/components/shared/Spinner';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useBookedDates } from '@/hooks/useBookedDates';
import { useQuoteTotal } from '@/hooks/useQuoteTotal';
import { useReserve } from '@/hooks/useReserve';
import useSession from '@/hooks/useSession';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type ReservationFormProps = {
  propertyId: string;
  maxGuests: number;
  pricePerNight: number;
  variant?: 'default' | 'mobile';
};

type DatePickerType = 'checkIn' | 'checkOut';

const EMPTY_BOOKED_DATES = new Set<string>();

const CALENDAR_CLASS_NAMES = {
  months: 'flex flex-col',
  month: 'flex flex-col gap-4',
  month_caption:
    'flex h-8 items-center justify-center text-sm font-medium text-grayish-900',
  nav: 'absolute inset-x-4 top-4 z-[1] flex justify-between',
  button_previous:
    'flex size-8 items-center justify-center rounded-full hover:bg-grayish-50 disabled:opacity-30 rtl:rotate-180',
  button_next:
    'flex size-8 items-center justify-center rounded-full hover:bg-grayish-50 disabled:opacity-30 rtl:rotate-180',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex',
  weekday: 'w-10 text-[0.8rem] font-normal text-grayish-400',
  week: 'mt-1 flex w-full',
  day: 'size-10 p-0 text-center text-sm',
  // Colors live on the button so the disabled state isn't overridden by the cell color
  day_button:
    'size-10 rounded-full text-grayish-900 transition-colors hover:bg-grayish-50 disabled:cursor-not-allowed disabled:text-grayish-200 disabled:hover:bg-transparent',
  selected: '',
  range_start:
    'rounded-s-full bg-grayish-50 [&>button]:bg-grayish-900 [&>button]:!text-white',
  range_end:
    'rounded-e-full bg-grayish-50 [&>button]:bg-grayish-900 [&>button]:!text-white',
  range_middle: 'bg-grayish-50 [&>button]:rounded-none',
  today: 'font-semibold',
  outside: '[&>button]:text-grayish-200',
  disabled: '',
  hidden: 'invisible',
};

// Booked dates from the API are nights in yyyy-MM-dd format
const toDateKey = (date: Date) => format(date, 'yyyy-MM-dd');

// Send the calendar day as UTC midnight so the local timezone can't shift it to the previous day
const toApiDate = (date: Date) => `${toDateKey(date)}T00:00:00Z`;

const parseDateParam = (value: string | null) => {
  if (!value) return undefined;
  const date = startOfDay(parseISO(value));
  return isValid(date) ? date : undefined;
};

const hasBookedNight = (from: Date, to: Date, bookedDates: Set<string>) => {
  for (let night = from; isBefore(night, to); night = addDays(night, 1)) {
    if (bookedDates.has(toDateKey(night))) return true;
  }
  return false;
};

const formatPrice = (amount: number) =>
  `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

function ReservationForm({
  propertyId,
  maxGuests,
  pricePerNight,
  variant = 'default',
}: ReservationFormProps) {
  const t = useTranslations('pages.propertyDetails.reservation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isLoggedIn = !!session;

  // Restore the selection carried through the login redirect
  const [range, setRange] = useState<DateRange>(() => {
    const from = parseDateParam(searchParams.get('checkIn'));
    const to = parseDateParam(searchParams.get('checkOut'));
    if (
      from &&
      to &&
      isBefore(from, to) &&
      !isBefore(from, startOfDay(new Date()))
    ) {
      return { from, to };
    }
    return { from: undefined };
  });
  const [guests, setGuests] = useState(() => {
    const value = Number(searchParams.get('guests'));
    return Number.isInteger(value) && value >= 1
      ? Math.min(value, maxGuests)
      : 1;
  });
  const [openPicker, setOpenPicker] = useState<DatePickerType | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const { from, to } = range;
  const nights = from && to ? differenceInCalendarDays(to, from) : 0;

  const bookedDatesQuery = useBookedDates(propertyId);
  const bookedDates = bookedDatesQuery.data ?? EMPTY_BOOKED_DATES;

  const quoteQuery = useQuoteTotal(
    propertyId,
    from && toApiDate(from),
    to && toApiDate(to),
    isLoggedIn,
  );

  const reserveMutation = useReserve();

  // The stay can run up to (and check out on) the first booked night after check-in
  const checkOutLimit = useMemo(() => {
    if (!from) return undefined;
    const fromKey = toDateKey(from);
    let limit: string | undefined;
    bookedDates.forEach((date) => {
      if (date >= fromKey && (!limit || date < limit)) limit = date;
    });
    return limit;
  }, [from, bookedDates]);

  const today = startOfDay(new Date());

  const isCheckInDisabled = (date: Date) => {
    const day = startOfDay(date);
    return isBefore(day, today) || bookedDates.has(toDateKey(day));
  };

  const isCheckOutDisabled = (date: Date) => {
    const day = startOfDay(date);
    // Check-out must be after check-in (or after today when no check-in yet)
    if (!isBefore(from ?? today, day)) return true;
    if (from) return !!checkOutLimit && toDateKey(day) > checkOutLimit;
    // Without a check-in, the night before check-out must be free
    return bookedDates.has(toDateKey(addDays(day, -1)));
  };

  const handleCheckInSelect = (_: DateRange | undefined, triggerDate: Date) => {
    const day = startOfDay(triggerDate);
    setSubmitError(undefined);
    // Keep the check-out only if it still forms a valid stay
    const keepTo =
      to && isBefore(day, to) && !hasBookedNight(day, to, bookedDates);
    setRange({ from: day, to: keepTo ? to : undefined });
    setOpenPicker(keepTo ? null : 'checkOut');
  };

  const handleCheckOutSelect = (
    _: DateRange | undefined,
    triggerDate: Date,
  ) => {
    setSubmitError(undefined);
    setRange({ from, to: startOfDay(triggerDate) });
    setOpenPicker(from ? null : 'checkIn');
  };

  const baseTotal = pricePerNight * nights;
  const total =
    nights > 0 && isLoggedIn && quoteQuery.data !== undefined
      ? quoteQuery.data
      : baseTotal;
  const isQuoteLoading = nights > 0 && quoteQuery.isFetching;
  const isReserving =
    isCheckingAvailability ||
    reserveMutation.isPending ||
    reserveMutation.isSuccess;

  const error =
    submitError ??
    (nights > 0 && quoteQuery.isError ? quoteQuery.error.message : undefined);

  const loginHref = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (from) params.set('checkIn', toDateKey(from));
    if (to) params.set('checkOut', toDateKey(to));
    params.set('guests', String(guests));
    return {
      pathname: '/login',
      query: { redirect: `${pathname}?${params.toString()}` },
    };
  }, [searchParams, pathname, from, to, guests]);

  const handleReserve = async () => {
    setSubmitError(undefined);

    if (!from || !to || guests < 1) {
      setSubmitError(t('errors.selectDatesAndGuests'));
      return;
    }

    if (!isLoggedIn) {
      setIsMobileDialogOpen(false);
      setIsLoginDialogOpen(true);
      return;
    }

    // Re-check availability right before reserving
    setIsCheckingAvailability(true);
    const { data: latestBookedDates, isError } =
      await bookedDatesQuery.refetch();
    setIsCheckingAvailability(false);

    if (isError || !latestBookedDates) {
      setSubmitError(t('errors.availabilityCheckFailed'));
      return;
    }

    if (hasBookedNight(from, to, latestBookedDates)) {
      setRange({ from: undefined });
      setSubmitError(t('errors.datesUnavailable'));
      return;
    }

    reserveMutation.mutate(
      {
        propertyId,
        checkInDate: toApiDate(from),
        checkOutDate: toApiDate(to),
        numberOfGuests: guests,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || t('success'));
          router.push('/account/reservations');
        },
        onError: (err) => {
          setSubmitError(err.message);
        },
      },
    );
  };

  const dateLocale = locale === 'ar' ? ar : enUS;
  const formatDate = (date: Date) =>
    format(date, 'd/M/yyyy', { locale: dateLocale });

  const priceSummary = (
    <div className='flex flex-wrap items-baseline gap-x-2 text-grayish-400'>
      {/* Original price comes first, struck through, when a discount applies */}
      {!isQuoteLoading && nights > 0 && total < baseTotal && (
        <span className='text-[1.75rem] font-medium leading-9 line-through lg:text-[2rem] lg:leading-10'>
          {formatPrice(baseTotal)}
        </span>
      )}
      {isQuoteLoading ? (
        <Spinner className='size-7 border-[3px]' />
      ) : (
        <span className='text-[1.75rem] font-medium leading-9 text-grayish-900 lg:text-[2rem] lg:leading-10'>
          {formatPrice(nights > 0 ? total : pricePerNight)}
        </span>
      )}
      <span>
        {nights > 0 ? t('forNights', { count: nights }) : t('perNight')}
      </span>
    </div>
  );

  const renderDatePicker = (type: DatePickerType) => {
    const isCheckIn = type === 'checkIn';
    const value = isCheckIn ? from : to;

    return (
      <Popover
        // Modal locks page scroll and outside interaction while the picker is open
        modal
        open={openPicker === type}
        onOpenChange={(open) => setOpenPicker(open ? type : null)}
      >
        <PopoverTrigger asChild>
          <button
            type='button'
            disabled={isReserving}
            className={cn(
              'flex flex-1 flex-col justify-center rounded-full text-start disabled:opacity-60',
              isCheckIn
                ? 'ps-4 lg:px-6 lg:py-2.5'
                : 'pe-4 ps-4 lg:px-6 lg:py-2.5',
            )}
          >
            <span className='text-sm leading-6 text-grayish-900'>
              {t(type)}
            </span>
            <span
              className={cn('leading-5 text-grayish-400', {
                'text-grayish-900': value,
              })}
            >
              {value ? formatDate(value) : t('addDate')}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={isCheckIn ? 'start' : 'end'}
          // Keep a gap from the viewport edges; the picker scrolls inside the space left
          collisionPadding={16}
          className='relative max-h-[var(--radix-popover-content-available-height)] w-auto max-w-[var(--radix-popover-content-available-width)] overflow-y-auto overscroll-contain rounded-2xl bg-white p-0'
          // Don't pull focus back to this trigger when switching to the other picker
          onCloseAutoFocus={(e) => {
            if (openPicker) e.preventDefault();
          }}
        >
          {bookedDatesQuery.isLoading && (
            <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70'>
              <Spinner />
            </div>
          )}
          <Calendar
            mode='range'
            selected={range}
            onSelect={isCheckIn ? handleCheckInSelect : handleCheckOutSelect}
            disabled={isCheckIn ? isCheckInDisabled : isCheckOutDisabled}
            defaultMonth={value ?? from ?? today}
            startMonth={today}
            locale={dateLocale}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className='relative p-4'
            classNames={CALENDAR_CLASS_NAMES}
          />
          {bookedDatesQuery.isError && (
            <div className='flex items-center justify-between gap-2 px-4 pb-4 text-sm text-error-500'>
              <span>{t('errors.availabilityLoadFailed')}</span>
              <button
                type='button'
                className='font-medium underline'
                onClick={() => bookedDatesQuery.refetch()}
              >
                {t('retry')}
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  };

  const fields = (
    <div className='flex flex-col gap-4'>
      {/* Dates selection */}
      <div className='flex h-16 w-full rounded-full border border-grayish-100'>
        {renderDatePicker('checkIn')}
        <span className='h-full w-px bg-grayish-50' />
        {renderDatePicker('checkOut')}
      </div>
      {/* Guests selection */}
      <div className='flex h-16 w-full justify-between rounded-full border border-grayish-100 px-6 py-2.5 text-grayish-900'>
        <div className='flex flex-col'>
          <span className='text-sm'>{t('guests')}</span>
          <span className=''>{t('guestsCount', { count: guests })}</span>
        </div>
        <div className='flex items-center gap-1'>
          <button
            type='button'
            onClick={() => {
              if (guests > 1) {
                setGuests(guests - 1);
              }
            }}
            disabled={guests <= 1 || isReserving}
            className='group'
          >
            <Minus className='size-6 transition-all duration-300 group-disabled:text-grayish-200' />
          </button>
          <button
            type='button'
            onClick={() => {
              if (guests < maxGuests) {
                setGuests(guests + 1);
              }
            }}
            disabled={guests >= maxGuests || isReserving}
            className='group'
          >
            <Plus className='size-6 transition-all duration-300 group-disabled:text-grayish-200' />
          </button>
        </div>
      </div>
      {error && (
        <p
          role='alert'
          className='whitespace-pre-line border-s-4 border-error-500 bg-error-50 p-2 text-sm font-semibold text-error-500'
        >
          {error}
        </p>
      )}
      <SubmitButton
        type='button'
        className='h-14 text-base text-grayish-50'
        onClick={handleReserve}
        disabled={isReserving}
        isSubmitting={isReserving}
      >
        {t('reserve')}
      </SubmitButton>
    </div>
  );

  const loginDialog = (
    <Modal
      isOpen={isLoginDialogOpen}
      onClose={() => setIsLoginDialogOpen(false)}
      className='w-[calc(100vw-2rem)] min-w-0 max-w-[28rem] gap-0 p-4 sm:p-6'
    >
      <div className='flex w-full flex-col items-center gap-7'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h6 className='text-xl font-medium text-grayish-900'>
            {t('loginRequired.title')}
          </h6>
          <p className='text-grayish-400'>{t('loginRequired.description')}</p>
        </div>
        <div className='flex w-full items-center gap-3 py-1 max-sm:flex-col'>
          <Button
            asChild
            className='min-w-0 flex-1 font-medium max-sm:w-full'
          >
            <Link href={loginHref}>{t('loginRequired.login')}</Link>
          </Button>
          <Button
            variant='outline'
            className='min-w-0 flex-1 font-medium max-sm:w-full'
            onClick={() => setIsLoginDialogOpen(false)}
          >
            {t('loginRequired.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );

  if (variant === 'mobile')
    return (
      <>
        <div className='flex h-full w-full items-center gap-4 bg-white p-6'>
          <div className='flex flex-col text-grayish-400'>
            {isQuoteLoading ? (
              <Spinner />
            ) : (
              <span className='text-2xl font-medium text-grayish-900'>
                {formatPrice(nights > 0 ? total : pricePerNight)}
              </span>
            )}
            <span>
              {nights > 0 ? t('forNights', { count: nights }) : t('perNight')}
            </span>
          </div>
          <span className='h-full w-px bg-grayish-50' />
          <Button
            className='h-12 flex-1 text-base text-grayish-50'
            onClick={() => setIsMobileDialogOpen(true)}
          >
            {t('reserve')}
          </Button>
        </div>
        <Modal
          isOpen={isMobileDialogOpen}
          onClose={() => setIsMobileDialogOpen(false)}
          className='w-[calc(100vw-2rem)] min-w-0 gap-0 bg-white p-4'
          header={<h6 className='text-xl font-medium'>{t('addDatesTitle')}</h6>}
        >
          <div className='flex flex-col gap-4 pt-4'>
            {priceSummary}
            {fields}
          </div>
        </Modal>
        {loginDialog}
      </>
    );

  return (
    <div className='flex flex-col gap-4'>
      {priceSummary}
      {fields}
      {loginDialog}
    </div>
  );
}

export default ReservationForm;
