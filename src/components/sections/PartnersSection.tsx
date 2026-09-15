'use client';
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Autoplay from 'embla-carousel-autoplay';

import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselScrollBar,
} from '@/components/ui/carousel';

import { PartnersSectionRes } from '@/types/page';

export default function PartnersSection({
  title,
  description,
  items,
}: PartnersSectionRes) {
  const t = useTranslations('sections.partners');
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className='flex flex-col gap-16'>
      {/* Header Section */}
      <div className='flex flex-col gap-2'>
        <h3
          title={title}
          className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.5rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='line-clamp-[7] whitespace-pre-wrap text-grayish-400 md:text-lg'
        >
          {description}
        </p>
      </div>

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
          className='relative flex w-full items-center gap-4 pb-4 [&>.overflow-hidden]:flex-1'
        >
          <CarouselContent className='-ms-6 flex-1 md:-ms-8 lg:-ms-12'>
            {items.map((review, index) => (
              <CarouselItem
                key={index}
                className='min-w-[20.464rem] max-w-[20.464rem] select-none ps-6 md:ps-8 lg:ps-12'
              >
                {/* Guest Info */}
                <div className='mb-4 flex gap-2'>
                  <div className='size-12 flex-shrink-0 overflow-hidden rounded-full bg-grayish-50'>
                    <MediaPreview
                      url={review.iconUrl}
                      className='size-full object-cover'
                      isIcon={true}
                    />
                  </div>
                  <div className='flex flex-1 flex-col gap-1 overflow-hidden'>
                    <h3
                      title={review.title}
                      className='line-clamp-1 font-medium text-grayish-900 md:text-lg'
                    >
                      {review.title}
                    </h3>
                    <p className='text-grayish-400'>{t('luftPartner')}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p
                  title={review.reviewText}
                  className='line-clamp-3 whitespace-pre-wrap text-grayish-400'
                >
                  {review.reviewText}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <CarouselScrollBar
          id='partners'
          api={api}
        />
      </div>
    </section>
  );
}
