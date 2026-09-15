'use client';

import { useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselScrollBar,
} from '@/components/ui/carousel';

import CardItem from './CardItem';

import { CardsSectionRes } from '@/types/page';

export default function CardsSection({
  title,
  description,
  items,
}: CardsSectionRes) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className='flex w-full flex-col gap-12 overflow-hidden text-center'>
      {/* Texts */}
      <div className='flex max-w-full flex-col gap-2 text-center'>
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

      <div className='flex flex-col items-center gap-6 md:gap-8 lg:gap-12'>
        <Carousel
          setApi={setApi}
          className='flex w-full items-center gap-1 pb-4 [&>.overflow-hidden]:flex-1'
        >
          <CarouselContent className='-ms-4 flex-1 lg:-ms-6'>
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className='ps-4 lg:ps-6'
              >
                <CardItem
                  key={'card' + item.id}
                  {...item}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <CarouselScrollBar
          id='cards'
          api={api}
        />
      </div>
    </div>
  );
}
