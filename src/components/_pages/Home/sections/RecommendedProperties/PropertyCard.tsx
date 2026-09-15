import { useTranslations } from 'next-intl';

import { Star } from 'lucide-react';

import MediaPreview from '../../../../shared/MediaPreview/MediaPreview';

import { Link } from '@/i18n/routing';

type PropertyCardProps = {
  image: string;
  title: string;
  description: string;
  rating: number;
  oldPrice?: number;
  newPrice: number;
  numOfReviews: number;
  id: string;
};

export default function PropertyCard({
  image,
  title,
  description,
  rating,
  oldPrice,
  newPrice,
  numOfReviews,
  id,
}: PropertyCardProps) {
  const t = useTranslations('common');

  return (
    <Link
      href={`/properties/${id}`}
      className='flex w-[13rem] select-none flex-col gap-4 overflow-hidden md:w-[22.375rem] lg:w-[26rem]'
    >
      <MediaPreview
        url={image}
        className='h-[12.875rem] w-full rounded-3xl object-cover md:h-[25rem]'
      />
      <div className='flex w-full flex-col gap-2'>
        <h5
          title={title}
          className='line-clamp-2 font-medium leading-5 text-grayish-900 md:text-lg lg:text-xl'
        >
          {title}
        </h5>
        <p
          title={description}
          className='line-clamp-1 leading-5 text-grayish-400'
        >
          {description}
        </p>
        {/* price and rating */}
        <div className='flex items-center gap-1 text-grayish-400 max-sm:flex-col max-sm:items-start max-sm:gap-1.5'>
          <div className='flex items-center gap-1 font-medium leading-5 text-grayish-400 md:text-lg lg:text-xl'>
            {oldPrice && <span className='line-through'>${oldPrice}</span>}
            <span className='text-grayish-900'>${newPrice}</span>
            <span className='text-base font-normal leading-5'>
              {t('night')}
            </span>
          </div>
          <span className='max-sm:hidden'>,</span>
          <div className='flex items-center text-lg leading-5'>
            <Star className='size-5 fill-grayish-400' /> &nbsp; {rating} &nbsp;
            <span className='leading-5'>({numOfReviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
