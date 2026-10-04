'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CalenderDateRangeIcon from '@/components/icons/CalenderDateRangeIcon';

import ReservationDetailsDialog from './ReservationDetailsDialog';

import {
  type ReservationListItem,
} from '@/types/reservations';

import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  upcoming: 'border border-grayish-900 text-grayish-900 bg-neutral-50',
  ongoing: 'border border-warning-500 text-warning-600 bg-transparent',
  completed: 'border border-success-500 text-success-600 bg-transparent',
  canceled: 'border border-error-500 text-error-500 bg-transparent',
};

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('reservations.status');
  const key = status.toLowerCase() as keyof typeof statusStyles;
  const style = statusStyles[key] ?? statusStyles['upcoming'];
  const label =
    key === 'upcoming'
      ? t('upcoming')
      : key === 'ongoing'
        ? t('ongoing')
        : key === 'completed'
          ? t('completed')
          : t('canceled');

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        style,
      )}
    >
      {label}
    </span>
  );
}

interface ReservationCardProps {
  reservation: ReservationListItem;
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
  const t = useTranslations('reservations');
  const {
    propertyName,
    propertyImageUrl,
    checkInDate,
    checkOutDate,
    submittedAt,
    status,
  } = reservation;

  const formattedSubmitted = new Date(submittedAt).toLocaleDateString();

  return (
    <ReservationDetailsDialog
      reservation={reservation}
      trigger={
        <button
          type='button'
          className='flex w-full cursor-pointer items-start gap-4 rounded-xl p-2 text-start transition-colors hover:bg-grayish-50 active:bg-grayish-100'
        >
          {/* Image */}
          <div className='relative h-[7.5rem] w-[8.5rem] shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36'>
            <Image
              src={propertyImageUrl}
              alt={propertyName}
              fill
              className='object-cover'
              sizes='(max-width: 600px) 136px, 144px'
            />
          </div>

          {/* Info */}
          <div className='flex flex-col gap-1.5 pt-1'>
            <h3 className='text-base font-semibold text-grayish-900 sm:text-lg'>
              {propertyName}
            </h3>
            <div className='flex items-center gap-1.5 text-grayish-500'>
              <CalenderDateRangeIcon className='size-4 shrink-0' />
              <span className='text-sm'>
                {checkInDate} — {checkOutDate}
              </span>
            </div>
            <p className='text-sm text-grayish-500'>
              {t('submittedOn', { date: formattedSubmitted })}
            </p>
            <div className='mt-0.5'>
              <StatusBadge status={status} />
            </div>
          </div>
        </button>
      }
    />
  );
}
