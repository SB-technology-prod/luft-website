import { getTranslations } from 'next-intl/server';

import PropertiesCarousel from './PropertiesCarousel';
import RecommendedPropertiesError from './RecommendedPropertiesError';

import { getRecommendedProperties } from '@/api/properties';

export default async function RecommendedProperties() {
  const t = await getTranslations('sections.recommendedProperties');

  try {
    const { result: properties } = await getRecommendedProperties();

    return (
      <div className='flex flex-col items-center gap-6 md:gap-8 lg:gap-12'>
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
  } catch (error) {
    return <RecommendedPropertiesError />;
  }
}
