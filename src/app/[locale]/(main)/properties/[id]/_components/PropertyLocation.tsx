'use client';

import { useTranslations } from 'next-intl';

import SectionTitle from './SectionTitle';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

interface PropertyLocationProps {
  lat: number;
  lng: number;
}

function HomeMarkerIcon() {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width='32'
        height='32'
        rx='16'
        fill='black'
      />
      <path
        d='M22.857 17.1375V22.8517C22.857 23.0581 22.7816 23.2367 22.6308 23.3875C22.48 23.5383 22.3015 23.6137 22.0951 23.6137H17.5237V19.0422H14.4761V23.6137H9.90464C9.69829 23.6137 9.51972 23.5383 9.36893 23.3875C9.21814 23.2367 9.14274 23.0581 9.14274 22.8517V17.1375C9.14274 17.1295 9.14472 17.1176 9.14869 17.1017C9.15266 17.0859 9.15464 17.074 9.15464 17.066L15.9999 11.4232L22.8451 17.066C22.8531 17.0819 22.857 17.1057 22.857 17.1375ZM25.5118 16.316L24.7737 17.197C24.7102 17.2684 24.6269 17.3121 24.5237 17.3279H24.488C24.3848 17.3279 24.3015 17.3002 24.238 17.2446L15.9999 10.3756L7.76179 17.2446C7.66655 17.3081 7.57131 17.3359 7.47607 17.3279C7.3729 17.3121 7.28956 17.2684 7.22607 17.197L6.48798 16.316C6.42448 16.2367 6.39671 16.1434 6.40464 16.0363C6.41258 15.9291 6.45623 15.8438 6.5356 15.7803L15.0951 8.64937C15.3491 8.44302 15.6507 8.33984 15.9999 8.33984C16.3491 8.33984 16.6507 8.44302 16.9046 8.64937L19.8094 11.0779V8.75651C19.8094 8.6454 19.8451 8.55413 19.9165 8.4827C19.988 8.41127 20.0792 8.37556 20.1904 8.37556H22.4761C22.5872 8.37556 22.6785 8.41127 22.7499 8.4827C22.8213 8.55413 22.857 8.6454 22.857 8.75651V13.6137L25.4642 15.7803C25.5435 15.8438 25.5872 15.9291 25.5951 16.0363C25.6031 16.1434 25.5753 16.2367 25.5118 16.316Z'
        fill='white'
      />
    </svg>
  );
}

export default function PropertyLocation({ lat, lng }: PropertyLocationProps) {
  const t = useTranslations('pages.propertyDetails.location');
  const position = { lat, lng };

  return (
    <div className='flex flex-col gap-4'>
      <SectionTitle>{t('title')}</SectionTitle>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
        <div className='h-fit w-full overflow-hidden rounded-3xl'>
          <Map
            className='h-[15.75rem] w-full md:h-[30rem]'
            defaultCenter={position}
            defaultZoom={16}
            gestureHandling='greedy'
            disableDefaultUI
            clickableIcons={false}
            mapId={'DEMO_MAP_ID'}
          >
            <AdvancedMarker position={position}>
              <HomeMarkerIcon />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}
