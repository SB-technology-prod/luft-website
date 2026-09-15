import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

type AboutSectionProps = {
  title: string;
  description: string;
  mediaUrl: string;
};

export default function AboutSection({
  title,
  description,
  mediaUrl,
}: AboutSectionProps) {
  return (
    <div className='flex h-full items-center gap-8 max-md:flex-col lg:gap-12'>
      <div className='flex w-[24rem] max-w-full flex-1 flex-col gap-2 overflow-hidden max-lg:flex-1 max-md:order-2 max-md:w-auto lg:w-[42.313rem]'>
        {/* Texts */}
        <h3
          title={title}
          className='line-clamp-2 w-fit text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.625rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='line-clamp-[12] w-fit whitespace-pre-wrap text-grayish-400 md:text-lg'
        >
          {description}
        </p>
      </div>

      <MediaPreview
        url={mediaUrl}
        className='h-[13.3rem] rounded-3xl max-lg:w-[23rem] max-sm:order-1 max-sm:w-full lg:h-[25.563rem] lg:w-[35.69rem]'
      />
    </div>
  );
}
