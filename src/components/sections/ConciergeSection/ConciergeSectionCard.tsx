import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

type FeatureSectionCardProps = {
  title: string;
  description: string;
  iconUrl: string;
};

export default function ConciergeSectionCard({
  title,
  description,
  iconUrl,
}: FeatureSectionCardProps) {
  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-white p-4 sm:min-w-[17.24rem] xl:gap-6'>
      <div className='flex size-6 items-center justify-center md:size-12'>
        <MediaPreview
          url={iconUrl}
          className='size-[1.36rem] md:size-8'
          isIcon={true}
        />
      </div>
      {/* Texts */}
      <div className='flex flex-col gap-1 overflow-hidden'>
        <h4
          title={title}
          className='line-clamp-1 w-fit font-medium text-grayish-900 md:text-lg'
        >
          {title}
        </h4>
        <p
          className='line-clamp-4 w-fit whitespace-pre-wrap text-base leading-5 text-grayish-400'
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
