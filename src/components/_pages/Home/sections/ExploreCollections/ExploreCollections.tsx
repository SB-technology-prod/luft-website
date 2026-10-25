import { getTranslations } from 'next-intl/server';

import CollectionCard from './CollectionCard';
import ExploreCollectionsError from './ExploreCollectionsError';
import MoreCollectionsCard from './MoreCollectionsCard';

import { getAllCollections } from '@/api/collections';
import { cn } from '@/lib/utils';

const SECTION_CLASSES = 'container my-20 md:my-[7.5rem] xl:my-[8.75rem]';

// number of collection cards in the design, the rest are summarized by the "more" card
const VISIBLE_COLLECTIONS = 5;

// featured column spans 2 columns, the side and "more" columns take 1 each
const GRID_COLS: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

const SMALL_CARD_CLASSES = 'xl:rounded-[2.18rem]';

export default async function ExploreCollections() {
  const t = await getTranslations('sections.exploreCollections');

  try {
    const { result: collections } = await getAllCollections();

    // hide the whole section (including its spacing) when there's nothing to show
    if (!collections?.length) return null;

    const [featured, first, second, tall, short] = collections;
    const remainingCount = collections.length - VISIBLE_COLLECTIONS;

    const hasSideColumn = !!tall;
    const hasMoreCard = remainingCount > 0;
    const colsCount = 2 + Number(hasSideColumn) + Number(hasMoreCard);

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

        <div
          className={cn(
            'grid w-full grid-cols-2 gap-x-2 gap-y-4 md:gap-4 xl:gap-6',
            GRID_COLS[colsCount],
            // with a single collection the featured card sizes itself
            { 'md:h-[28.6875rem] xl:h-[47.1875rem]': !!first },
          )}
        >
          {/* featured column */}
          <div className='col-span-2 flex flex-col gap-4 xl:gap-6'>
            <CollectionCard
              {...featured}
              className='h-[12.3125rem] shrink-0 md:h-[13.8125rem] xl:h-[22.75rem]'
            />
            {first && (
              <div className='flex h-[12.5rem] gap-2 md:h-auto md:min-h-0 md:flex-1 md:gap-4 xl:gap-6'>
                <CollectionCard
                  {...first}
                  className={cn('flex-1', SMALL_CARD_CLASSES)}
                  gradientClassName='to-[37%]'
                />
                {second && (
                  <CollectionCard
                    {...second}
                    className={cn('flex-1', SMALL_CARD_CLASSES)}
                    gradientClassName='to-[65%]'
                  />
                )}
              </div>
            )}
          </div>

          {/* side column */}
          {hasSideColumn && (
            <div
              className={cn('flex flex-col gap-4 md:gap-2 xl:gap-6', {
                'max-md:col-span-2': !hasMoreCard,
              })}
            >
              <CollectionCard
                {...tall}
                className={cn(
                  'h-[16.375rem] shrink-0',
                  SMALL_CARD_CLASSES,
                  short
                    ? 'md:h-[18.8125rem] xl:h-[30.5rem]'
                    : 'md:h-auto md:min-h-0 md:flex-1',
                )}
                gradientClassName='to-[55%]'
              />
              {short && (
                <CollectionCard
                  {...short}
                  className={cn(
                    'h-[8.0625rem] md:h-auto md:min-h-0 md:flex-1',
                    SMALL_CARD_CLASSES,
                  )}
                  gradientClassName='to-[81%]'
                />
              )}
            </div>
          )}

          {hasMoreCard && <MoreCollectionsCard count={remainingCount} />}
        </div>
      </div>
    );
  } catch {
    return (
      <div className={SECTION_CLASSES}>
        <ExploreCollectionsError />
      </div>
    );
  }
}
