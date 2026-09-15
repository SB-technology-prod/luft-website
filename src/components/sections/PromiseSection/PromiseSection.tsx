import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import BulletCard from './BulletCard';

import { MediaPositionEnum, PromiseSectionRes } from '@/types/page';

import { cn } from '@/lib/utils';

export default function PromiseSectionPreview({
  title,
  description,
  items,
  mediaUrl,
  mediaExtension,
  mediaPosition,
}: PromiseSectionRes) {
  return (
    <div className='flex flex-col gap-6 md:gap-8 xl:gap-12'>
      {/* Texts */}
      <div className='flex max-w-full flex-col items-center gap-2 overflow-hidden text-center'>
        <h3 className='line-clamp-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-[2.625rem] xl:text-5xl xl:leading-[3.625rem]'>
          {title}
        </h3>
        <p className='line-clamp-4 whitespace-pre-wrap text-grayish-400 md:text-lg'>
          {description}
        </p>
      </div>

      <div className='flex justify-between gap-4 max-xl:flex-col xl:items-center xl:gap-6'>
        {/* media */}
        {mediaPosition === MediaPositionEnum.START && (
          <MediaPreview
            url={mediaUrl}
            className={cn(
              'h-[37.5rem] w-full rounded-2xl max-sm:h-[14rem] xl:w-[46.75rem]',
            )}
          />
        )}

        {/* Bullets */}
        <div className='flex max-w-full flex-1 flex-col gap-12 overflow-hidden max-xl:order-2'>
          {items?.map((bullet, i) => (
            <BulletCard
              data={bullet}
              key={`bulletItem-${i}`}
            />
          ))}
        </div>

        {/* media */}
        {mediaPosition === MediaPositionEnum.END && (
          <MediaPreview
            url={mediaUrl}
            className={cn(
              'h-[37.5rem] w-full rounded-2xl max-xl:order-1 max-sm:h-[14rem] xl:w-[46.75rem]',
            )}
          />
        )}
      </div>
    </div>
  );
}
