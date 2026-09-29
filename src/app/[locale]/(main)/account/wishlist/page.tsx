'use client';

import { useTranslations } from 'next-intl';

import { useQuery } from '@tanstack/react-query';

import StatusLayout from '@/components/shared/StatusLayout';

import PropertyWishlistCard from './_components/PropertyWishlistCard';
import PropertyWishlistCardSkeleton from './_components/PropertyWishlistCardSkeleton';

import { getUserWishlist, wishlistQueryKey } from '@/api/wishlist';

export default function WishlistPage() {
  const t = useTranslations('pages.wishlist');

  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: [wishlistQueryKey],
    queryFn: getUserWishlist,
  });

  const items = data?.result?.items ?? [];

  if (!isFetching && (isError || !items.length))
    return (
      <StatusLayout
        title={t('emptyTitle')}
        paragraph={t('emptyDescription')}
        mainImageSrc='/svg/emptyWishlist.svg'
      />
    );

  return (
    <div className='mx-4 my-6 flex flex-col items-center gap-6 md:mx-6 md:my-2 md:gap-8 lg:mx-auto lg:my-16 lg:gap-16'>
      <h3 className='text-center text-3xl font-medium text-grayish-900 md:text-3xl lg:text-5xl lg:leading-[3.625rem]'>
        {t('title')}
      </h3>
      {isFetching ? (
        <div className='grid grid-cols-3 gap-2 md:gap-6'>
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyWishlistCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-2 md:gap-6'>
          {items.map((item) => (
            <PropertyWishlistCard
              key={item.propertyId}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
