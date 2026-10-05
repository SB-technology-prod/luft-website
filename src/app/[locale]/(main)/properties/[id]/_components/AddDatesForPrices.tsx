import { getTranslations } from 'next-intl/server';

import ReservationForm from './ReservationForm';

type AddDatesForPricesProps = {
  propertyId: string;
  maxGuests: number;
  pricePerNight: number;
};
export default async function AddDatesForPrices({
  propertyId,
  maxGuests,
  pricePerNight,
}: AddDatesForPricesProps) {
  const t = await getTranslations('pages.propertyDetails.reservation');

  return (
    <div
      style={{ boxShadow: '0px 4px 20px 0px #1B1B1B12' }}
      className='flex h-fit w-[15.7rem] flex-col gap-4 rounded-2xl bg-white p-4 max-md:hidden lg:w-[26rem]'
    >
      <div className='flex flex-col gap-1'>
        <h6 className='text-xl font-medium lg:text-2xl'>
          {t('addDatesTitle')}
        </h6>
        <p className='leading-5 text-grayish-400'>{t('addDatesSubtitle')}</p>
      </div>
      {/* Reservations form (includes the live price) */}
      <ReservationForm
        propertyId={propertyId}
        maxGuests={maxGuests}
        pricePerNight={pricePerNight}
      />
    </div>
  );
}
