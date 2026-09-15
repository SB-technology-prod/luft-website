'use client';

import { useTranslations } from 'next-intl';

import { Heart } from 'lucide-react';

import useSession from '@/hooks/useSession';

export default function AddToWishlistBtn() {
  const session = useSession();
  const t = useTranslations('pages.propertyDetails.actions');

  if (!session) return null;

  return (
    <div className='flex items-center gap-2'>
      <Heart className='size-6 fill-grayish-400 stroke-grayish-400' />
      <span className='text-grayish-900 max-xl:hidden'>{t('wishlist')}</span>
    </div>
  );
}
