'use client';

import Image from 'next/image';

import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import ReservationDetailsDialog, {
  type ReservationItem,
  type ReservationStatus,
} from './ReservationDetailsDialog';

const statusConfig: Record<
  ReservationStatus,
  { label: string; className: string }
> = {
  upcoming: {
    label: 'Upcoming',
    className: 'border border-grayish-900 text-grayish-900 bg-transparent',
  },
  ongoing: {
    label: 'Ongoing',
    className: 'border border-warning-500 text-warning-600 bg-transparent',
  },
  completed: {
    label: 'Completed',
    className: 'border border-success-500 text-success-600 bg-transparent',
  },
  canceled: {
    label: 'Canceled',
    className: 'border border-error-500 text-error-500 bg-transparent',
  },
};

function StatusBadge({ status }: { status: ReservationStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

interface ReservationCardProps {
  reservation: ReservationItem;
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
  const { title, imageUrl, checkInDisplay, checkOutDisplay, submittedOn, status } =
    reservation;

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
              src={imageUrl}
              alt={title}
              fill
              className='object-cover'
              sizes='(max-width: 600px) 136px, 144px'
            />
          </div>

          {/* Info */}
          <div className='flex flex-col gap-1.5 pt-1'>
            <h3 className='text-base font-semibold text-grayish-900 sm:text-lg'>
              {title}
            </h3>
            <div className='flex items-center gap-1.5 text-grayish-500'>
              <CalendarIcon className='size-4 shrink-0' />
              <span className='text-sm'>
                {checkInDisplay} To {checkOutDisplay}
              </span>
            </div>
            <p className='text-sm text-grayish-500'>Submitted on: {submittedOn}</p>
            <div className='mt-0.5'>
              <StatusBadge status={status} />
            </div>
          </div>
        </button>
      }
    />
  );
}
