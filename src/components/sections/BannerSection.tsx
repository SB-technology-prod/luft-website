import ImageIcon from '@/components/icons/ImageIcon';

import { cn } from '@/lib/utils';

export type BannerSectionProps = {
  title: string;
  description: string;
  mediaUrl: string;
  className?: string;
};

export default function BannerSection({
  title,
  description,
  mediaUrl,
  className,
}: BannerSectionProps) {
  if (!mediaUrl)
    return (
      <div className='flex size-full flex-col items-center justify-center gap-6 overflow-hidden bg-grayish-50'>
        <ImageIcon />
        <div className='flex size-fit flex-col items-center gap-2 px-2'>
          <h6 className='text-grayish-400'>{title}</h6>
          <p className='text-5xl font-medium text-grayish-900'>{description}</p>
        </div>
      </div>
    );

  return (
    <div
      className={cn(
        'flex size-full h-[21.25rem] items-center justify-center overflow-hidden bg-cover bg-center p-4 sm:h-[25rem]',
        className,
      )}
      style={{ backgroundImage: `url(${mediaUrl})` }}
    >
      <div className='flex max-h-full flex-col items-center gap-2 overflow-hidden text-center font-medium text-white'>
        <h6
          title={title}
          className='line-clamp-1 text-lg sm:text-xl md:text-2xl'
        >
          {title}
        </h6>
        <p
          title={description}
          className='line-clamp-1 overflow-hidden text-5xl leading-[3.625rem] sm:text-6xl sm:leading-[3.75rem] md:text-7xl md:leading-[5.25rem]'
        >
          {description}
        </p>
      </div>
    </div>
  );
}
