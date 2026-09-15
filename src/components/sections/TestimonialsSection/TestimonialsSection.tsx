'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Autoplay from 'embla-carousel-autoplay';

import AirbnbIcon from '@/components/icons/AirbnbIcon';
import StarRating from '@/components/icons/StarRating';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselScrollBar,
} from '@/components/ui/carousel';

interface Review {
  id: string;
  guestName: string;
  location: string;
  avatar: string;
  rating: number;
  daysAgo: number;
  stayedDays: number;
  text: string;
}

export default function TestimonialsSection() {
  const t = useTranslations('sections.testimonials');
  const [api, setApi] = useState<CarouselApi>();

  const reviews: Review[] = [
    {
      id: '1',
      guestName: 'Mikasa Aramin',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa1',
      rating: 4,
      daysAgo: 5,
      stayedDays: 6,
      text: t('dummyReviewText'),
    },
    {
      id: '2',
      guestName: 'Eren Yeager',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eren',
      rating: 5,
      daysAgo: 12,
      stayedDays: 4,
      text: t('dummyReviewText'),
    },
    {
      id: '3',
      guestName: 'Armin Arlert',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armin',
      rating: 5,
      daysAgo: 8,
      stayedDays: 7,
      text: t('dummyReviewText'),
    },
    {
      id: '4',
      guestName: 'Levi Ackerman',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Levi',
      rating: 5,
      daysAgo: 2,
      stayedDays: 14,
      text: t('dummyReviewText'),
    },
    {
      id: '5',
      guestName: 'Hange Zoe',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hange',
      rating: 4,
      daysAgo: 20,
      stayedDays: 3,
      text: t('dummyReviewText'),
    },
    {
      id: '6',
      guestName: 'Erwin Smith',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erwin',
      rating: 5,
      daysAgo: 45,
      stayedDays: 5,
      text: t('dummyReviewText'),
    },
    {
      id: '7',
      guestName: 'Jean Kirstein',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
      rating: 4,
      daysAgo: 15,
      stayedDays: 2,
      text: t('dummyReviewText'),
    },
    {
      id: '8',
      guestName: 'Sasha Blouse',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha',
      rating: 5,
      daysAgo: 6,
      stayedDays: 8,
      text: t('dummyReviewText'),
    },
    {
      id: '9',
      guestName: 'Connie Springer',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Connie',
      rating: 4,
      daysAgo: 30,
      stayedDays: 4,
      text: t('dummyReviewText'),
    },
    {
      id: '10',
      guestName: 'Historia Reiss',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Historia',
      rating: 5,
      daysAgo: 50,
      stayedDays: 10,
      text: t('dummyReviewText'),
    },
    {
      id: '11',
      guestName: 'Ymir',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ymir',
      rating: 4,
      daysAgo: 55,
      stayedDays: 6,
      text: t('dummyReviewText'),
    },
    {
      id: '12',
      guestName: 'Reiner Braun',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reiner',
      rating: 3,
      daysAgo: 100,
      stayedDays: 2,
      text: t('dummyReviewText'),
    },
    {
      id: '13',
      guestName: 'Zeke Yeager',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeke',
      rating: 4,
      daysAgo: 120,
      stayedDays: 5,
      text: t('dummyReviewText'),
    },
    {
      id: '14',
      guestName: 'Annie Leonhart',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Annie',
      rating: 5,
      daysAgo: 150,
      stayedDays: 7,
      text: t('dummyReviewText'),
    },
  ];

  return (
    <section className='w-full'>
      {/* Header Section */}
      <div className='mb-8 flex flex-col items-start justify-between gap-2 md:mb-12 md:flex-row md:items-end md:gap-6 lg:mb-16'>
        <div className='flex-1'>
          <h2 className='mb-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] lg:text-5xl lg:leading-[3.625rem]'>
            {t('title')}
          </h2>
          <p className='text-grayish-400 lg:text-lg'>{t('subtitle')}</p>
        </div>

        {/* Rating Badge */}
        <div className='flex flex-col items-center gap-1 max-sm:items-start md:items-end'>
          <div className='flex items-baseline gap-2'>
            <span className='text-5xl font-medium leading-[3.625rem] md:text-6xl md:leading-[4.5rem] lg:text-7xl lg:leading-[5.375rem]'>
              4.8
            </span>
          </div>
          <div className='flex items-center gap-4 max-sm:flex-col max-sm:items-start'>
            <StarRating
              rating={4.5}
              size='md'
            />
            <span className='text-grayish-400'>
              {t('ratedBy', { count: '1,000' })}
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div className='flex flex-col items-center gap-8 md:gap-12 lg:gap-16'>
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: true,
              stopOnLastSnap: true,
            }),
          ]}
          className='flex w-full items-center gap-2 pb-4 [&>.overflow-hidden]:flex-1'
        >
          <CarouselContent className='-ms-6 flex-1 md:-ms-8 lg:-ms-12'>
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className='flex min-w-fit select-none flex-col ps-6 md:ps-8 lg:ps-12'
              >
                {/* Guest Info */}
                <div className='mb-4 flex gap-2'>
                  <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100'>
                    <Image
                      src={review.avatar}
                      alt={review.guestName}
                      width={48}
                      height={48}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='line-clamp-1 text-lg text-grayish-900'>
                      {review.guestName}
                    </h3>
                    <p className='line-clamp-1 whitespace-pre-wrap text-grayish-400'>
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Rating and Metadata */}
                <div className='mb-4 flex min-w-fit items-center gap-2 text-grayish-900'>
                  <StarRating
                    rating={review.rating}
                    size='sm'
                    className='gap-1.5'
                  />
                  <span className='w-1 text-xs text-grayish-400'>•</span>
                  <span className='whitespace-nowrap'>
                    {t('daysAgo', { days: review.daysAgo })}
                  </span>
                  <span className='w-1 text-xs text-grayish-400'>•</span>
                  <span className='whitespace-nowrap text-grayish-400'>
                    {t('stayedDays', { days: review.stayedDays })}
                  </span>
                </div>

                {/* Review Text */}
                <p
                  title={review.text}
                  className='mb-1 line-clamp-3 min-w-[20.465rem] max-w-[20.465rem] flex-1 whitespace-pre-wrap text-grayish-400'
                >
                  {review.text}
                </p>

                {/* Airbnb Attribution */}
                <div className='flex items-center gap-2 pt-3'>
                  <span className='text-grayish-900'>{t('ratedOn')}</span>
                  <AirbnbIcon />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <CarouselScrollBar
          id='testimonials'
          api={api}
          className='bg-grayish-100'
        />
      </div>
    </section>
  );
}
