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

import { PropertySearchResultsCardSkeleton } from './PropertySearchResultsCardSkeleton';

import { useDirection } from '@/hooks/useDirection';

import { SearchItem } from '@/types/search';

import { Link } from '@/i18n/routing';

interface PropertySearchResultsCardProps {
    item: SearchItem;
}

export default function PropertySearchResultsCard({
    item,
}: PropertySearchResultsCardProps) {
    const t = useTranslations('common');
    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);

    const {
        id,
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        pricePerNight,
        images,
        isWishlisted,
        reviewCount,
        rating,
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

    // Carousel controls live inside the card link — keep them from navigating
    const preventNavigation = (e: React.MouseEvent) => e.preventDefault();
    const direction = useDirection();
    const locale = direction === 'rtl' ? 'ar' : 'en';
    return (
        <Link
            href={`/properties/${id}`}
            className='relative flex w-full min-w-0 flex-col gap-4'
        >
            <AddToWishlistBtn
                variant='icon'
                className='absolute end-3 top-3 z-20 md:end-6 md:top-6'
                isWishlisted={isWishlisted}
                propertyId={id}
            />
            {/* Carousel */}
            <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                className='w-full overflow-hidden rounded-3xl'
            >
                <CarouselContent
                    className='aspect-[175/143] md:aspect-auto md:h-[17.94rem]'
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

                {/* Arrows — mobile only */}
                {images.length > 1 && (
                    <>
                        <CarouselPrevious
                            onClickCapture={preventNavigation}
                            className='left-4 size-7 border-none bg-grayish-900 text-grayish-50 hover:bg-grayish-900 hover:text-grayish-50 md:hidden [&>svg]:!size-5'
                        />
                        <CarouselNext
                            onClickCapture={preventNavigation}
                            className='right-4 size-7 border-none bg-grayish-900 text-grayish-50 hover:bg-grayish-900 hover:text-grayish-50 md:hidden [&>svg]:!size-5'
                        />
                    </>
                )}

                {/* Circle dot indicators */}
                {images.length > 1 && (
                    <div className='absolute bottom-2 left-1/2 z-10 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-1 overflow-hidden rounded-full bg-grayish-900 px-1 py-[1.5px] md:bottom-6 md:p-1'>
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    preventNavigation(e);
                                    api?.scrollTo(i);
                                }}
                                aria-label={`Go to image ${i + 1}`}
                                className={`size-[9px] shrink-0 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white' : 'bg-grayish-300'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </Carousel>

            {/* Info */}
            <div className='flex w-full flex-col gap-2'>
                <h5
                    title={locale === 'en' ? titleEn : titleAr}
                    className='line-clamp-2 text-xl font-medium leading-[1.625rem] tracking-[-0.3px] text-grayish-900'
                >
                    {locale === 'en' ? titleEn : titleAr}
                </h5>
                <p
                    title={locale === 'en' ? descriptionEn : descriptionAr}
                    className='truncate leading-[1.3125rem] text-grayish-400'
                >
                    {locale === 'en' ? descriptionEn : descriptionAr}
                </p>
                {/* price and rating */}
                <div className='flex flex-wrap items-center gap-x-1 whitespace-nowrap text-grayish-400'>
                    <div className='flex items-center gap-1'>
                        <span className='text-xl font-medium leading-[1.625rem] tracking-[-0.3px] text-grayish-900'>
                            ${pricePerNight}
                        </span>
                        <span className='leading-[1.3125rem]'>{t('night')} ,</span>
                    </div>
                    <div className='flex items-center gap-1 text-lg leading-[1.6875rem]'>
                        <Star className='size-5 shrink-0 fill-grayish-400' />
                        <span>
                            {rating} ({reviewCount})
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export { PropertySearchResultsCardSkeleton };
PropertySearchResultsCard.Skeleton = PropertySearchResultsCardSkeleton;
