import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import MediaHero from '../../Home/sections/Hero/CustomVideoPlay';

import { HeroSectionRes } from '@/types/page';

export default function HeroSection({
  title,
  description,
  mediaUrl,
  mediaExtension,
}: HeroSectionRes) {
  const t = useTranslations('pages.forOwners.buttons');
  return (
    <div className='flex h-full flex-col gap-4 overflow-hidden lg:flex-row lg:items-center lg:justify-between lg:gap-6'>
      <div className='order-2 flex flex-1 flex-col gap-6 overflow-hidden md:gap-8 lg:order-1 lg:gap-12'>
        {/* Texts */}
        <div className='flex max-w-full flex-col gap-4 overflow-hidden'>
          <h3
            title={title}
            className='line-clamp-2 text-[2rem] font-medium leading-[2.5rem] text-grayish-900 md:text-5xl md:leading-[3.5rem] lg:text-6xl lg:leading-[4.52rem]'
          >
            {title}
          </h3>
          <p
            title={description}
            className='line-clamp-4 text-grayish-400 md:text-lg'
          >
            {description}
          </p>
        </div>

        <Button
          type='button'
          className='h-14 w-[19.125rem] max-w-full rounded-full px-4 py-2'
        >
          {t('startPartnership')}
        </Button>
      </div>
      {/* media */}
      <MediaHero
        src={mediaUrl}
        extension={mediaExtension}
        className='h-[14rem] w-full rounded-[2.5rem] md:h-[27.875rem] lg:order-2 lg:w-[39.625rem] lg:min-w-[39.625rem]'
      />{' '}
    </div>
  );
}
