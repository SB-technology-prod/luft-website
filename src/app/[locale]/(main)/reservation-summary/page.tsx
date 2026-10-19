import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import ReservationSummaryPage from './_components/ReservationSummaryPage';

export async function generateMetadata() {
  const t = await getTranslations('reservationSummary');
  return { title: t('title'), robots: { index: false, follow: false } };
}

export default function Page() {
  return (
    <Suspense>
      <ReservationSummaryPage />
    </Suspense>
  );
}
