'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Autoplay from 'embla-carousel-autoplay';

import StarRating from '@/components/icons/StarRating';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import ReviewCard from './ReviewCard';

import { PropertyReview } from '@/types/properties';

type ReviewsSectionProps = {
  reviews: PropertyReview[];
};
export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const t = useTranslations('pages.propertyDetails.reviews');
  const tReviews = useTranslations('sections.testimonials');
  const [isExpanded, setIsExpanded] = useState(false);

  const maxCollapsedReviews = 4;
  const reviewsCount = reviews.length;
  const hasSeeMore = reviewsCount > maxCollapsedReviews;

  return (
    <section className='w-full'>
      {/* Header Section */}
      <div className='mb-12 flex flex-col items-start justify-between gap-2 md:mb-12 md:flex-row md:items-end md:gap-6 lg:mb-16'>
        <div className='flex-1'>
          <h2 className='mb-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] lg:text-5xl lg:leading-[3.625rem]'>
            {tReviews('title')}
          </h2>
          <p className='text-grayish-400 lg:text-lg'>{tReviews('subtitle')}</p>
        </div>

        {/* Rating Badge */}
        <div className='flex flex-col gap-1 max-sm:items-start md:items-end'>
          <div className='flex items-baseline gap-2'>
            <span className='text-5xl font-medium leading-[3.625rem] md:text-6xl md:leading-[4.5rem] lg:text-7xl lg:leading-[5.375rem]'>
              4.8
            </span>
          </div>
          <div className='flex items-center gap-4 max-md:flex-col max-md:items-start'>
            <StarRating
              rating={4.5}
              size='md'
            />
            <span className='text-grayish-400'>
              {tReviews('ratedBy', { count: '1,000' })}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col max-sm:hidden'>
        <div className='grid grid-cols-2 gap-x-10 gap-y-12'>
          {Array.from({
            length: hasSeeMore
              ? isExpanded
                ? reviewsCount
                : maxCollapsedReviews
              : reviewsCount,
          }).map((_, index) => (
            <ReviewCard
              key={reviews[index].id}
              review={reviews[index]}
            />
          ))}
        </div>
        {hasSeeMore && (
          <button
            type='button'
            className='mx-4 my-2.5 mt-8 w-fit text-grayish-900 underline lg:mt-12'
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? t('showLess') : t('showAll')}
          </button>
        )}
      </div>

      {/* Reviews Carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: true,
            stopOnLastSnap: true,
          }),
        ]}
        className='flex w-full items-center gap-2 sm:hidden [&>.overflow-hidden]:flex-1'
      >
        <CarouselPrevious className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent p-0 hover:bg-grayish-30 max-sm:hidden' />

        <CarouselContent className='-ms-4 flex-1'>
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className='ms-4 min-w-fit ps-0'
            >
              <ReviewCard
                key={review.id}
                review={review}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent p-0 hover:bg-grayish-30 max-sm:hidden' />
      </Carousel>
    </section>
  );
}
