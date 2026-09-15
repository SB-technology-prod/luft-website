import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import { BulletRes } from '@/types/page';

export default function BulletCard({ data }: { data: BulletRes }) {
  const iconUrl = data?.iconUrl;
  const title = data?.title;
  const description = data?.description;

  return (
    <div className='flex max-w-full gap-2 overflow-hidden xl:flex-col'>
      <MediaPreview
        url={iconUrl}
        className='size-6 md:size-8 xl:size-10'
        isIcon={true}
      />

      {/* Texts */}
      <div className='flex flex-1 flex-col gap-1 overflow-hidden'>
        <h6
          className='line-clamp-1 w-fit text-lg font-medium text-grayish-900 md:text-xl xl:text-2xl'
          title={title}
        >
          {title}
        </h6>
        <p
          className='line-clamp-2 w-fit whitespace-pre-wrap text-grayish-400 md:text-lg'
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
