'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import LoadingError from '@/components/shared/LoadingError';

export default function ExploreCollectionsError() {
  const t = useTranslations('sections.exploreCollections');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <LoadingError
      errorMsg={t('error')}
      onRefetch={() => startTransition(() => router.refresh())}
      isRefetching={isPending}
    />
  );
}
