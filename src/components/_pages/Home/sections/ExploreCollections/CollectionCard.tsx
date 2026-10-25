import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import { cn } from '@/lib/utils';

type CollectionCardProps = {
  name: string;
  description?: string;
  imageUrl: string;
  className?: string;
  // the overlay height differs per slot in the design to keep the text readable
  gradientClassName?: string;
};

export default function CollectionCard({
  name,
  description,
  imageUrl,
  className,
  gradientClassName = 'to-[60%]',
}: CollectionCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl shadow-[0px_0px_21.8px_-4.36px_rgba(147,73,7,0.05)]',
        className,
      )}
    >
      <MediaPreview
        url={imageUrl || null}
        className='absolute inset-0 size-full rounded-none'
        isIcon
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-[#15110d] to-[#15110d00]',
          gradientClassName,
        )}
      />
      <div className='absolute inset-x-4 bottom-6 flex flex-col gap-1 xl:inset-x-6 xl:bottom-8'>
        <h4
          title={name}
          className='line-clamp-2 text-lg font-medium leading-[1.6875rem] tracking-[-0.017rem] text-grayish-50 md:text-xl md:leading-[1.625rem] md:tracking-[-0.019rem] xl:text-2xl xl:leading-[1.9375rem] xl:tracking-[-0.0225rem]'
        >
          {name}
        </h4>
        {description && (
          <p
            title={description}
            className='line-clamp-3 leading-[1.3125rem] text-grayish-100 max-md:hidden'
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
