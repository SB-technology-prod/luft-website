import { MediaContentItem } from '@/types/page';

export default function MediaItem({
  title,
  description,
  number,
}: MediaContentItem) {
  return (
    <div className='flrx flex-col gap-1 overflow-hidden'>
      <h4
        title={title}
        className='line-clamp-1 w-fit text-lg font-medium text-grayish-900 md:text-xl xl:text-2xl'
      >
        {number && (
          <span className='text-[1.75rem] leading-9 md:text-[2rem] md:leading-10 xl:text-5xl xl:leading-[3.625rem]'>
            {number}
          </span>
        )}
        &nbsp;
        {title}
      </h4>
      <p
        title={description}
        className='line-clamp-2 w-fit whitespace-pre-wrap text-grayish-400 md:text-lg'
      >
        {description}
      </p>
    </div>
  );
}
