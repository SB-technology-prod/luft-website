import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import MediaItem from './MediaItem';

import { MediaContentSection as MediaContentSectionType } from '@/types/page';

export default function MediaContentSection({
  mediaUrl,
  items,
}: MediaContentSectionType) {
  return (
    <div className='flex h-full flex-col items-center gap-6 md:flex-row md:gap-8 xl:gap-12'>
      {/* media */}
      <MediaPreview
        url={mediaUrl}
        className='h-[15.69rem] w-full rounded-3xl md:h-[19.375rem] md:w-[23.563rem] xl:h-[25.563rem] xl:max-w-[39rem] xl:flex-1'
      />
      {/* items */}
      <div className='flex max-w-full flex-1 flex-col gap-12 overflow-hidden'>
        {items?.map((item) => {
          return (
            <MediaItem
              key={item.id}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
