'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import LoadingError from '@/components/shared/LoadingError';

export default function RecommendedPropertiesError() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <LoadingError
      errorMsg={'Failed to load recommended properties'}
      onRefetch={() => startTransition(() => router.refresh())}
      isRefetching={isPending}
    />
  );
}
