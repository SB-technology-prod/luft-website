import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import { CardItem } from '@/types/page';

export default function CardItemPreview({
  title,
  iconUrl,
  mediaExtension,
}: CardItem) {
  return (
    <button
      type='button'
      className='group flex min-w-[19.125rem] max-w-[19.125rem] select-none flex-col gap-4 overflow-hidden max-sm:min-w-[15.625rem] max-sm:max-w-[15.625rem]'
    >
      <MediaPreview
        url={iconUrl}
        className='h-[22.25rem] w-full rounded-2xl transition-all duration-300 group-hover:scale-[0.98] max-sm:h-[18.438rem]'
      />
      {/* Texts */}
      <h6 className='line-clamp-1 max-w-full whitespace-pre-wrap font-medium text-grayish-900 md:text-lg lg:text-xl'>
        {title}
      </h6>
    </button>
  );
}
