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
        buttonLabel={t('discoverHomes')}
      />
    );

  return (
    <div className='mx-auto my-6 flex w-full max-w-[68.25rem] flex-col items-center gap-6 px-4 md:my-8 md:gap-8 md:px-6 lg:my-16 lg:gap-12 xl:px-0'>
      <h3 className='text-center text-3xl font-medium text-grayish-900 lg:text-5xl lg:leading-[3.625rem]'>
        {t('title')}
      </h3>
      <div className='grid w-full grid-cols-2 gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-8 lg:grid-cols-3 lg:gap-y-12'>
        {isFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <PropertyWishlistCardSkeleton key={index} />
            ))
          : items.map((item) => (
              <PropertyWishlistCard
                key={item.propertyId}
                item={item}
              />
            ))}
      </div>
    </div>
  );
}
