import MediaHero from './CustomVideoPlay';
import { HomeSearch } from './HomeSearch';

import { HeroSectionRes } from '@/types/page';

export default function HeroSectionPreview({
  title,
  description,
  mediaUrl,
  mediaExtension,
}: HeroSectionRes) {
  return (
    <div className='flex h-full flex-col items-center gap-4 xl:flex-row xl:justify-between xl:gap-6'>
      <div className='order-2 flex w-full max-w-full flex-col gap-6 overflow-hidden md:gap-8 xl:order-1 xl:gap-12'>
        {/* Texts */}
        <div className='flex max-w-full flex-1 flex-col gap-4 overflow-hidden'>
          <h3
            title={title}
            className='line-clamp-3 w-fit text-[2rem] font-medium leading-[2.5rem] text-grayish-900 md:text-5xl md:leading-[3.5rem] xl:text-6xl xl:leading-[4.52rem]'
          >
            {title}
          </h3>
          <p
            title={description}
            className='line-clamp-4 w-fit text-grayish-400 md:text-lg'
          >
            {description}
          </p>
        </div>
        <HomeSearch />
      </div>

      {/* media */}
      <MediaHero
        src={mediaUrl}
        extension={mediaExtension}
        className='h-[14rem] w-full rounded-[2.5rem] md:h-[27.875rem] xl:order-2 xl:w-[39.625rem] xl:min-w-[39.625rem]'
      />
    </div>
  );
}
