import { getTranslations } from 'next-intl/server';

import PropertiesCarousel from './PropertiesCarousel';
import RecommendedPropertiesError from './RecommendedPropertiesError';

import { getRecommendedProperties } from '@/api/properties';
import { cn } from '@/lib/utils';

const SECTION_CLASSES = 'container my-20 md:my-[7.5rem] xl:my-[8.75rem]';

export default async function RecommendedProperties() {
  const t = await getTranslations('sections.recommendedProperties');

  try {
    const { result: properties } = await getRecommendedProperties();

    // hide the whole section (including its spacing) when there's nothing to show
    if (!properties?.length) return null;

    return (
      <div
        className={cn(
          SECTION_CLASSES,
          'flex flex-col items-center gap-6 md:gap-8 lg:gap-12',
        )}
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h3 className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-[2.75rem] xl:text-5xl xl:leading-[3.625rem]'>
            {t('title')}
          </h3>
          <p className='text-grayish-400 md:text-lg'>{t('subtitle')}</p>
        </div>
        {/* carousel */}
        <PropertiesCarousel properties={properties} />
      </div>
    );
  } catch {
    return (
      <div className={SECTION_CLASSES}>
        <RecommendedPropertiesError />
      </div>
    );
  }
}
