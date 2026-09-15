import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';

import ProfileForm from './_components/Forms/ProfileForm';


export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations('settings');
  const { locale } = await params;
  const isRtl = locale === 'ar';
  return (
    <div className='container mb-[9.875rem] mt-6 flex w-full gap-8 max-lg:flex-col max-md:gap-6 md:mb-44 md:mt-20 xl:mb-48 xl:ms-[4.5rem] xl:mt-28 xl:w-[60.375rem]'>
      {/* Section Title */}
      <div className='flex gap-4 max-lg:items-center lg:flex-col xl:-mt-16'>
        <Link
          href='/'
          className='w-fit max-sm:hidden'
        >
          {isRtl ? (
            <CircleChevronRightIcon className='size-10 stroke-1 text-grayish-900' />
          ) : (
            <CircleChevronLeftIcon className='size-10 stroke-1 text-grayish-900' />
          )}
        </Link>
        <div className='flex flex-col gap-2'>
          <h6 className='text-2xl font-medium text-grayish-900 sm:text-[1.75rem] lg:max-w-36 lg:text-[2rem]'>
            {t('title')}
          </h6>
          <p className='text-grayish-400 md:text-lg lg:hidden'>
            {t('description')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='flex flex-1 flex-col gap-12'>
        <p className='text-lg text-grayish-400 max-lg:hidden'>
          {t('description')}
        </p>

        <ProfileForm />
      </div>
    </div>
  );
}
