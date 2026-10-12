'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import CalenderDateRangeIcon from '@/components/icons/CalenderDateRangeIcon';

import ReservationDetailsDialog from './ReservationDetailsDialog';
import StatusBadge from './StatusBadge';

import { type ReservationListItem } from '@/types/reservations';

interface ReservationCardProps {
  reservation: ReservationListItem;
}

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th';

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatStayDateRange(
  checkInDate: string,
  checkOutDate: string,
  locale: string,
) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return `${checkInDate} To ${checkOutDate}`;
  }

  if (locale !== 'en') {
    const formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    });

    return `${formatter.format(checkIn)} - ${formatter.format(checkOut)}`;
  }

  const formatEnglishDate = (date: Date) => {
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(
      date,
    );

    return `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${month}`;
  };

  return `${formatEnglishDate(checkIn)} To ${formatEnglishDate(checkOut)}`;
}

function formatSubmittedDate(date: string, locale: string) {
  const submittedDate = new Date(date);

  if (Number.isNaN(submittedDate.getTime())) return date;

  if (locale !== 'en') {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(submittedDate);
  }

  return `${submittedDate.getDate()} ${new Intl.DateTimeFormat('en', {
    month: 'long',
  })
    .format(submittedDate)
    .toLowerCase()} ${submittedDate.getFullYear()}`;
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
  const locale = useLocale();
  const t = useTranslations('reservations');
  const {
    propertyName,
    propertyImageUrl,
    checkInDate,
    checkOutDate,
    submittedAt,
    status,
  } = reservation;

  const formattedStayDates = formatStayDateRange(
    checkInDate,
    checkOutDate,
    locale,
  );
  const formattedSubmitted = formatSubmittedDate(submittedAt, locale);

  return (
    <ReservationDetailsDialog
      reservation={reservation}
      trigger={
        <button
          type='button'
          className='flex flex-col md:flex-row w-full cursor-pointer items-start gap-3 py-4 text-start transition-colors hover:bg-grayish-50 p-2 rounded active:bg-grayish-100 sm:gap-4'
        >
          <div className='relative h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-56 md:h-28 md:w-36'>
            <Image
              src={propertyImageUrl}
              alt={propertyName}
              fill
              className='object-cover'
              sizes='(max-width: 767px) 100vw, 144px'
            />
          </div>
          {/* content  */}
          <div className='flex w-full items-start justify-between gap-3 pt-1 md:flex-col md:justify-start md:gap-1'>
            <div className='flex min-w-0 flex-col gap-1'>
              <h3 className='line-clamp-1 text-sm font-semibold text-grayish-900 sm:text-base'>
                {propertyName}
              </h3>
              <div className='flex items-center gap-1 text-grayish-500'>
                <CalenderDateRangeIcon className='size-3.5 shrink-0' />
                <span className='line-clamp-1 text-sm'>{formattedStayDates}</span>
              </div>
              <p className='text-sm text-grayish-500'>
                {t('submittedOn', { date: formattedSubmitted })}
              </p>
            </div>
            <div className='mt-1 shrink-0'>
              <StatusBadge status={status} />
            </div>
          </div>
        </button>
      }
    />
  );
}
