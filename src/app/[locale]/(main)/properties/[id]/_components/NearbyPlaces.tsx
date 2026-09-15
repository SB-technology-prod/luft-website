import { Check } from 'lucide-react';

import DriveIcon from '@/components/icons/DriveIcon';

import SectionTitle from './SectionTitle';

import { NearbyPlaceCategory } from '@/types/properties';

export default function NearbyPlaces({
  nearbyPlaces,
}: {
  nearbyPlaces: NearbyPlaceCategory[];
}) {
  return (
    <div className='grid w-full grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3'>
      {nearbyPlaces.map(({ category, places }) => (
        <div
          key={category}
          className='flex flex-col gap-6'
        >
          <SectionTitle className='line-clamp-1'>{category}</SectionTitle>
          <div className='flex flex-col gap-4'>
            {places.map(({ time, placeName }) => (
              <div
                key={placeName}
                className='flex justify-between'
              >
                <div className='flex items-center gap-2'>
                  <Check className='size-5 text-grayish-400' />
                  <span className='line-clamp-1 font-medium leading-5 text-grayish-900 md:text-lg lg:text-xl'>
                    {placeName}
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='line-clamp-1 flex-1 text-grayish-400'>
                    {time}
                  </span>
                  <DriveIcon className='size-6 text-grayish-400' />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
