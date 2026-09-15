import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import { HowItWorksItem } from '@/types/page';

export default function WorkItem({
  title,
  description,
  iconUrl,
}: HowItWorksItem) {
  return (
    <div className='flex w-full flex-col items-center gap-4 overflow-hidden'>
      <MediaPreview
        url={iconUrl}
        className='h-[22.375rem] w-full rounded-3xl object-cover max-sm:rounded-[2.19rem] md:h-[25rem] xl:h-[30.5rem] xl:rounded-[2.19rem]'
      />
      {/* Texts */}
      <div className='flex max-w-full flex-col gap-2 overflow-hidden text-center'>
        <h6
          title={title}
          className='line-clamp-1 text-lg font-medium text-grayish-900 md:text-xl xl:text-2xl'
        >
          {title}
        </h6>
        <p
          title={description}
          className='line-clamp-5 whitespace-pre-wrap text-grayish-400'
        >
          {description}
        </p>
      </div>
    </div>
  );
}
