'use client';
import { ReactNode } from 'react';

import { useTranslations } from 'next-intl';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

type LoadingErrorProps = {
  errorMsg?: ReactNode;
  onRefetch?: () => void;
  isRefetching?: boolean;
};

export default function LoadingError({
  errorMsg,
  onRefetch,
  isRefetching,
}: LoadingErrorProps) {
  const t = useTranslations('common');

  return (
    <div className='my-5 flex flex-col items-center gap-2'>
      <div className='flex items-center justify-center gap-3 text-center text-xl font-medium text-error-400'>
        <AlertCircle className='stroke-error-400' />
        <div>{errorMsg || t('failedToLoadData')}</div>
      </div>
      {onRefetch && (
        <Button
          variant={'link'}
          disabled={isRefetching}
          onClick={onRefetch}
        >
          {t('buttons.refetch')}
        </Button>
      )}
    </div>
  );
}
