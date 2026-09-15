import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AirbnbIcon from '@/components/icons/AirbnbIcon';
import StarRating from '@/components/icons/StarRating';

import { PropertyReview } from '@/types/properties';

export default function ReviewCard({ review }: { review: PropertyReview }) {
  const t = useTranslations('sections.testimonials');

  return (
    <div className='flex animate-fade flex-col'>
      {/* Guest Info */}
      <div className='mb-4 flex gap-2'>
        <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-grayish-100'>
          <Image
            src={review.imageUrl}
            alt={review.name}
            width={48}
            height={48}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex-1'>
          <h3 className='line-clamp-1 text-lg text-grayish-900'>
            {review.name}
          </h3>
          <p className='line-clamp-1 whitespace-pre-wrap text-grayish-400'>
            {review.city}
          </p>
        </div>
      </div>

      {/* Rating and Metadata */}
      <div className='mb-4 flex items-center gap-2 text-grayish-900'>
        <StarRating
          rating={review.rating}
          size='sm'
          className='gap-1.5'
        />
        <span className='w-1 text-xs text-grayish-400'>•</span>
        <span className=''>{t('daysAgo', { days: review.daysAgo })}</span>
        <span className='w-1 text-xs text-grayish-400'>•</span>
        <span className='text-grayish-400'>
          {t('stayedDays', { days: review.lengthOfStay })}
        </span>
      </div>

      {/* Review Text */}
      <p
        title={review.reviewText}
        className='mb-1 line-clamp-3 flex-1 whitespace-pre-wrap text-grayish-400 max-sm:min-w-[20.465rem] max-sm:max-w-[20.465rem]'
      >
        {review.reviewText}
      </p>

      {/* Airbnb Attribution */}
      <div className='flex items-center gap-2 pt-3'>
        <span className='text-grayish-900'>{t('ratedOn')}</span>
        <AirbnbIcon />
      </div>
    </div>
  );
}
