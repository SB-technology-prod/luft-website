'use client';

import Image from 'next/image';

import { CalendarIcon, Star, Users } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export type ReservationStatus = 'upcoming' | 'ongoing' | 'completed' | 'canceled';

export interface ReservationItem {
  id: string;
  title: string;
  location: string;
  description: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  checkIn: string;
  checkOut: string;
  checkInDisplay: string;
  checkOutDisplay: string;
  submittedOn: string;
  status: ReservationStatus;
  guests: number;
  nightlyRate: number;
  nights: number;
  breakfastCount: number;
  earlyCheckIn: boolean;
  taxes: number;
  paymentMethod: {
    brand: string;
    last4: string;
    expDate: string;
  };
}

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

function MastercardIcon() {
  return (
    <svg
      width='38'
      height='24'
      viewBox='0 0 38 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='38' height='24' rx='4' fill='#F9FAFB' />
      <circle cx='15' cy='12' r='7' fill='#EB001B' />
      <circle cx='23' cy='12' r='7' fill='#F79E1B' />
      <path
        d='M19 6.8C20.5 7.9 21.5 9.35 21.5 12C21.5 14.65 20.5 16.1 19 17.2C17.5 16.1 16.5 14.65 16.5 12C16.5 9.35 17.5 7.9 19 6.8Z'
        fill='#FF5F00'
      />
    </svg>
  );
}

interface ReservationDetailsDialogProps {
  reservation: ReservationItem;
  trigger: React.ReactNode;
}

export default function ReservationDetailsDialog({
  reservation,
  trigger,
}: ReservationDetailsDialogProps) {
  const {
    title,
    description,
    rating,
    reviewsCount,
    imageUrl,
    checkInDisplay,
    checkOutDisplay,
    status,
    guests,
    nightlyRate,
    nights,
    breakfastCount,
    earlyCheckIn,
    taxes,
    paymentMethod,
  } = reservation;

  const nightsTotal = nightlyRate * nights;
  const breakfastTotal = nightlyRate * breakfastCount;
  const earlyCheckInTotal = earlyCheckIn ? nightlyRate : 0;
  const finalPrice = nightsTotal + breakfastTotal + earlyCheckInTotal + taxes;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='max-h-[90vh] w-full max-w-[42.5rem] overflow-y-auto rounded-2xl bg-white p-6 sm:rounded-2xl'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl font-semibold text-grayish-900'>
            Reservation Details
          </DialogTitle>
        </DialogHeader>

        {/* Property Info */}
        <div className='flex gap-4'>
          <div className='relative h-28 w-36 shrink-0 overflow-hidden rounded-xl'>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className='object-cover'
              sizes='144px'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <Star className='size-4 fill-amber-400 stroke-amber-400' />
              <span className='text-sm font-medium text-grayish-900'>
                {rating} ({reviewsCount})
              </span>
            </div>
            <h3 className='text-lg font-semibold text-grayish-900'>{title}</h3>
            <p className='text-sm text-grayish-500'>{description}</p>
            <div className='mt-1'>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        <div className='my-4 h-px bg-grayish-100' />

        {/* Check In - Check Out */}
        <div className='flex flex-col gap-2'>
          <p className='font-medium text-grayish-900'>Check-in - Check-out</p>
          <div className='flex items-center gap-2 text-grayish-600'>
            <CalendarIcon className='size-4 shrink-0' />
            <span className='text-sm'>
              {checkInDisplay} To {checkOutDisplay}
            </span>
          </div>
        </div>

        <div className='my-4 h-px bg-grayish-100' />

        {/* Guests */}
        <div className='flex flex-col gap-2'>
          <p className='font-medium text-grayish-900'>Guests</p>
          <div className='flex items-center gap-2 text-grayish-600'>
            <Users className='size-4 shrink-0' />
            <span className='text-sm'>{guests} Guests</span>
          </div>
        </div>

        <div className='my-4 h-px bg-grayish-100' />

        {/* Summary */}
        <div className='flex flex-col gap-3'>
          <p className='font-medium text-grayish-900'>Summary</p>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between text-sm text-grayish-700'>
              <span>
                $ {nightlyRate} × {nights} nights
              </span>
              <span>$ {nightsTotal}</span>
            </div>
            <div className='flex items-center justify-between text-sm text-grayish-700'>
              <span>
                $ {nightlyRate} × {breakfastCount} Breakfast
              </span>
              <span>$ {breakfastTotal}</span>
            </div>
            {earlyCheckIn && (
              <div className='flex items-center justify-between text-sm text-grayish-700'>
                <span>$ {nightlyRate} × Early Check-In</span>
                <span>$ {earlyCheckInTotal}</span>
              </div>
            )}
            <div className='flex items-center justify-between text-sm text-grayish-700'>
              <span>Taxes</span>
              <span>$ {taxes}</span>
            </div>
          </div>
        </div>

        <div className='my-4 h-px bg-grayish-100' />

        {/* Final Price */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-grayish-900'>Final Price</span>
          <span className='font-semibold text-grayish-900'>$ {finalPrice}</span>
        </div>

        <div className='my-4 h-px bg-grayish-100' />

        {/* Payment Method */}
        <div className='flex flex-col gap-3'>
          <p className='font-medium text-grayish-900'>Payment Method</p>
          <div className='flex items-center gap-3'>
            <MastercardIcon />
            <span className='text-sm text-grayish-700'>
              {paymentMethod.brand} **** {paymentMethod.last4}
            </span>
          </div>
          <p className='text-sm text-grayish-600'>
            EXP Date: {paymentMethod.expDate}
          </p>
        </div>

        <div className='mt-4'>
          <button className='text-sm text-grayish-900 underline underline-offset-2 transition-colors hover:text-error-500'>
            Cancel Reservation
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
