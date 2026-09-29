'use client';
import { useCallback, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Star } from 'lucide-react';

import AddToWishlistBtn from '@/components/shared/AddToWishlistBtn';
import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { PropertyWishlistCardSkeleton } from './PropertyWishlistCardSkeleton';

import { wishlistItemApi } from '@/types/wishlist';

interface PropertyWishlistCardProps {
  item: wishlistItemApi;
}

export default function PropertyWishlistCard({
  item,
}: PropertyWishlistCardProps) {
  const t = useTranslations('common');
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    propertyId,
    name,
    description,
    pricePerNight,
    rating,
    reviewsCount,
    images,
    isWishlisted,
  } = item;

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className='relative flex w-[10.94rem] flex-col gap-4 overflow-hidden md:w-[23.8rem] lg:w-[21.75rem]'>
      <AddToWishlistBtn
        variant='icon'
        className='absolute end-6 top-6 z-50'
        isWishlisted={isWishlisted}
        propertyId={propertyId}
      />
      {/* Carousel */}
      <div className='relative h-[8.94rem] w-full md:h-[17.94rem]'>
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className='h-full w-full overflow-hidden rounded-3xl'
        >
          <CarouselContent
            className='h-[8.94rem] md:h-[17.94rem]'
            style={{ marginLeft: 0 }}
          >
            {images.map((img) => (
              <CarouselItem
                key={img.url}
                className='min-w-full basis-full pl-0'
              >
                <MediaPreview
                  url={img.url}
                  className='h-full w-full rounded-3xl object-cover'
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows — small screens only */}
          {images.length > 1 && (
            <>
              <CarouselPrevious className='left-2 size-7 border-none bg-grayish-900 text-grayish-50 backdrop-blur-sm sm:hidden [&>svg]:!size-7' />
              <CarouselNext className='right-2 size-7 border-none bg-grayish-900 text-grayish-50 backdrop-blur-sm sm:hidden [&>svg]:!size-7' />
            </>
          )}

          {/* Circle dot indicators */}
          {images.length > 1 && (
            <div className='absolute bottom-2.5 left-1/2 z-10 flex h-[17px] max-w-full -translate-x-1/2 items-center gap-1.5 rounded-lg bg-grayish-900 px-1'>
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`size-[9px] rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-white' : 'bg-grayish-300'
                  }`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>

      {/* Info */}
      <div className='flex w-full flex-col gap-2'>
        <h5
          title={name}
          className='line-clamp-2 font-medium leading-5 text-grayish-900 md:text-lg lg:text-xl'
        >
          {name}
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
            <span className='line-clamp-1 text-grayish-900'>
              ${pricePerNight}
            </span>
            <span className='text-base font-normal leading-5'>
              {t('night')}
            </span>
          </div>
          <span className='max-sm:hidden'>,</span>
          <div className='flex items-center text-lg leading-5'>
            <Star className='size-5 fill-grayish-400' /> &nbsp; {rating} &nbsp;
            <span className='leading-5'>({reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PropertyWishlistCardSkeleton };
PropertyWishlistCard.Skeleton = PropertyWishlistCardSkeleton;


