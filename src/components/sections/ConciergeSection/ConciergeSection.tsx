import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';

import ConciergeSectionCard from './ConciergeSectionCard';

import { ConciergeSectionRes } from '@/types/page';

type ConciergeSectionProps = ConciergeSectionRes & {
  ctaUrl?: string;
  ctaLabel?: string;
};

export default async function ConciergeSectionPreview({
  title,
  description,
  items,
  ctaLabel,
  ctaUrl,
}: ConciergeSectionProps) {
  const t = await getTranslations('common.buttons');
  return (
    <div className='max-size-full flex flex-col items-center justify-center gap-6 md:gap-8 xl:gap-12'>
      {/* Texts */}
      <div className='flex max-w-full flex-col items-center gap-2 overflow-hidden text-center'>
        <h4
          title={title}
          className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-[2.625rem] xl:text-5xl xl:leading-[3.6rem]'
        >
          {title}
        </h4>
        <p
          className='line-clamp-7 whitespace-pre-wrap text-grayish-400 md:text-lg'
          title={description}
        >
          {description}
        </p>
      </div>

      {/* Features Cards */}
      <div className='grid w-full grid-cols-[repeat(auto-fit,minmax(17.24rem,1fr))] gap-6 max-sm:grid-cols-1'>
        {items.map((feature, i) => (
          <ConciergeSectionCard
            key={`conciergeItem-${i}`}
            title={feature.title}
            description={feature.description}
            iconUrl={feature.iconUrl}
          />
        ))}
      </div>

      {ctaUrl && (
        <Button className='h-10 w-[11.25rem] md:h-12'>
          {ctaLabel || t('exploreMore')}
        </Button>
      )}
    </div>
  );
}
