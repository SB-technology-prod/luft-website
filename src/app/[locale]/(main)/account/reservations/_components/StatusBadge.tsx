'use client';

import { useTranslations } from 'next-intl';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full border bg-white px-2 py-0.5 text-xs font-medium leading-5',
  {
    variants: {
      variant: {
        upcoming: 'border-neutral-900 text-neutral-900',
        ongoing: 'border-warning-500 text-warning-700',
        completed: 'border-success-500 text-success-600',
        canceled: 'border-error-500 text-error-600',
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

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const t = useTranslations('reservations.status');
  const variant = status.toLowerCase() as StatusBadgeVariant;
  const safeVariant = statusLabels[variant] ? variant : 'upcoming';

  return (
    <span
      className={cn(statusBadgeVariants({ variant: safeVariant }), className)}
    >
      {t(statusLabels[safeVariant])}
    </span>
  );
}

export { statusBadgeVariants };
