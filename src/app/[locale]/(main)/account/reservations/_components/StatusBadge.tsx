'use client';

import { useTranslations } from 'next-intl';

import { cva, type VariantProps } from 'class-variance-authority';

import { type ReservationStatusId } from '@/types/reservations';

import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full border bg-white px-2 py-0.5 text-xs font-medium leading-5',
  {
    variants: {
      variant: {
        upcoming: 'border-neutral-900 text-neutral-900 bg-neutral-50',
        ongoing: 'border-warning-500 text-warning-700 bg-warning-50',
        completed: 'border-success-500 text-success-600 bg-success-50',
        canceled: 'border-error-500 text-error-600 bg-error-50',
      },
    },
    defaultVariants: {
      variant: 'upcoming',
    },
  },
);

type StatusBadgeVariant = NonNullable<
  VariantProps<typeof statusBadgeVariants>['variant']
>;

const statusLabels: Record<StatusBadgeVariant, string> = {
  upcoming: 'upcoming',
  ongoing: 'ongoing',
  completed: 'completed',
  canceled: 'canceled',
};

const statusIdBadgeVariants: Record<ReservationStatusId, StatusBadgeVariant> = {
  1: 'upcoming',
  2: 'upcoming',
  3: 'ongoing',
  4: 'completed',
  5: 'canceled',
  6: 'upcoming',
};

interface StatusBadgeProps {
  statusId?: ReservationStatusId | number | null;
  className?: string;
}

export default function StatusBadge({ statusId, className }: StatusBadgeProps) {
  const t = useTranslations('reservations.status');
  const variant =
    statusIdBadgeVariants[statusId as ReservationStatusId] ?? 'upcoming';

  return (
    <span
      className={cn(statusBadgeVariants({ variant }), className)}
    >
      {t(statusLabels[variant])}
    </span>
  );
}

export { statusBadgeVariants };
