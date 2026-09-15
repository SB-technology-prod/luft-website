'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ChevronLeft, Grip } from 'lucide-react';

import { Modal } from '@/components/shared/Modal';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import AddToWishlistBtn from './AddToWishlistBtn';
import ShareBtn from './ShareBtn';

import type { PropertyImage } from '@/types/properties';

type PropertyImagesProps = {
  images: PropertyImage[];
};

export default function PropertyImages({ images }: PropertyImagesProps) {
  const t = useTranslations('pages.propertyDetails.images');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const coverImage = images.find((img) => img.isCover)?.url ?? '';

  const hasShowPhotosBtn = images.length > 5;

  const openGalleryWithImage = (index: number) => {
    setIsGalleryOpen(true);
    setActiveImgIndex(index);
  };

  return (
    <>
      <div className='container relative mt-[4.5rem] max-md:hidden md:h-[23.75rem] xl:h-[36.625rem]'>
        <div className='relative flex h-full max-h-full gap-4'>
          {hasShowPhotosBtn && (
            <button
              onClick={() => openGalleryWithImage(0)}
              type='button'
              style={{ boxShadow: '0px 4px 20px 0px #1B1B1B12' }}
              className='absolute bottom-4 end-4 z-30 flex w-fit items-center justify-center gap-1 rounded-full bg-white px-1.5 py-2.5 text-grayish-900 max-md:hidden lg:w-[12.5rem] lg:px-0'
            >
              <Grip className='size-5' />
              <span className='leading-5'>{t('showAll')}</span>
            </button>
          )}

          <button
            onClick={() => openGalleryWithImage(0)}
            type='button'
          >
            <img
              src={coverImage}
              alt=''
              className='h-full rounded-2xl object-cover md:w-[24.5rem] xl:w-[39.75rem]'
            />
          </button>

          <div className='grid flex-1 grid-cols-2 grid-rows-2 gap-4'>
            {Array.from({ length: 5 }).map((_, index) => {
              const imageUrl = images[index]?.url;
              const isCover = images[index]?.isCover;
              if (!imageUrl || isCover) return null;

              return (
                <button
                  type='button'
                  key={index}
                  onClick={() => openGalleryWithImage(index)}
                >
                  <img
                    src={imageUrl}
                    alt=''
                    className='h-full w-full rounded-2xl object-cover'
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        toggle={setIsGalleryOpen}
        header={
          <>
            <h4 className='p-6 text-center text-3xl font-medium'>
              {t('title')}
            </h4>
          </>
        }
        className='h-[95%] gap-0 overflow-hidden bg-transparent max-md:hidden [&>#modal-content]:h-full [&>button>svg]:text-grayish-30'
      >
        <div className='h-full w-full px-8 pb-10'>
          <Carousel
            opts={{ startIndex: activeImgIndex }}
            className='flex h-full w-full items-center gap-4 [&>.overflow-hidden]:h-full [&>.overflow-hidden]:max-h-full [&>.overflow-hidden]:flex-1'
          >
            <CarouselPrevious className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent bg-grayish-30 p-0 hover:bg-grayish-30 max-sm:hidden' />

            <CarouselContent className='!m-0 h-full max-h-full'>
              {images.map(({ url, id }, index) => {
                return (
                  <CarouselItem
                    className='flex max-h-full min-w-full justify-center pl-0'
                    key={id + index}
                  >
                    <img
                      src={url}
                      alt=''
                      className='max-h-full min-h-full'
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNext className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent bg-grayish-30 p-0 hover:bg-grayish-30 max-sm:hidden' />
          </Carousel>
        </div>
      </Modal>

      <Carousel
        setApi={setApi}
        className='relative md:hidden'
      >
        <Link
          href={'/'}
          className='absolute start-4 top-2 z-20 flex size-10 items-center justify-center rounded-full bg-grayish-50'
        >
          <ChevronLeft className='text-grayish-400 rtl:rotate-180' />
        </Link>
        <div className='absolute end-4 top-2 z-20 flex items-center gap-2'>
          <div className='flex size-10 items-center justify-center rounded-full bg-grayish-50'>
            <AddToWishlistBtn />
          </div>
          <div className='flex size-10 items-center justify-center rounded-full bg-grayish-50'>
            <ShareBtn />
          </div>
        </div>
        {count > 0 && (
          <div className='absolute bottom-2 left-1/2 z-50 mx-auto flex w-[66px] -translate-x-1/2 animate-fade items-center justify-center rounded-2xl bg-grayish-50 text-center text-lg leading-5 text-grayish-900'>
            <span>{current}</span>/<span>{count}</span>
          </div>
        )}
        <CarouselContent className='!-ml-0'>
          <CarouselItem
            className='h-[270px] min-w-full pl-0'
            key={coverImage}
          >
            <img
              src={coverImage}
              alt=''
              className='size-full object-cover'
            />
          </CarouselItem>

          {images.map(({ url, id, isCover }, index) => {
            if (isCover) return null;
            return (
              <CarouselItem
                className='h-[270px] min-w-full pl-0'
                key={id + index}
              >
                <img
                  src={url}
                  alt=''
                  className='size-full object-cover'
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
