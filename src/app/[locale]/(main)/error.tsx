'use client';
import { useTranslations } from 'next-intl';

import StatusLayout from '@/components/shared/StatusLayout';

export default function Error() {
  const t = useTranslations('emptyStates.error');

  return (
    <StatusLayout
      title={t('title')}
      paragraph={t('description')}
      mainImageSrc='/svg/emptyState.svg'
    />
  );
}
