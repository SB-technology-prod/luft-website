import { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import RatedByGuests from '@/components/shared/RatedByGuests';

import { LayoutDataResponse } from '@/types/layout';

import { getLayoutData } from '@/api/page';
import { Locale } from '@/i18n/i18n.config';

export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    result: {
      pages,
      contactInfo: { socials, items },
    },
  }: LayoutDataResponse = await getLayoutData(locale as Locale);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center justify-center bg-grayish-50 py-4'>
        <RatedByGuests
          textClassName='leading-5'
          color='var(--ps-neutral-900)'
        />
      </div>
      <Navbar
        navLinks={pages}
        locale={locale as Locale}
        socialLinks={socials}
      />
      <main className='flex w-full flex-1 items-center justify-center bg-white'>
        {children}
      </main>
      <Footer
        socialMediaItems={socials}
        navLinks={pages}
        contactItems={items}
      />
    </div>
  );
}
