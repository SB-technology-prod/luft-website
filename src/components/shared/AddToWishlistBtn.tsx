'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Heart } from 'lucide-react';

import { useAddToWishlist } from '@/hooks/useAddToWishlist';
import { useRemoveFromWishlist } from '@/hooks/useRemoveFromWishlist';
import useSession from '@/hooks/useSession';

import { cn } from '@/lib/utils';

type AddToWishlistBtnProps = {
  variant?: 'default' | 'icon';
  className?: string;
  isWishlisted?: boolean;
  propertyId?: string;
};

export default function AddToWishlistBtn({
  variant = 'default',
  className,
  isWishlisted = false,
  propertyId,
}: AddToWishlistBtnProps) {
  const session = useSession();
  const t = useTranslations('pages.propertyDetails.actions');

  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemoving } =
    useRemoveFromWishlist();

  const [isInWishlist, setIsInWishlist] = useState(isWishlisted);

  useEffect(() => {
    setIsInWishlist(isWishlisted);
  }, [isWishlisted]);

  const isPending = isAdding || isRemoving;
  const isActive = isAdding ? true : isRemoving ? false : isInWishlist;

  if (!session) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!propertyId || isPending) return;
    if (isInWishlist) {
      removeFromWishlist(propertyId, {
        onSuccess: () => setIsInWishlist(false),
      });
    } else {
      addToWishlist(propertyId, {
        onSuccess: () => setIsInWishlist(true),
      });
    }
  };

  return (
    <button
      type='button'
      disabled={isPending}
      onClick={handleClick}
      className={cn('flex items-center gap-2 disabled:opacity-60', className)}
    >
      <Heart
        className={cn(
          'size-6 transition-colors',
          isActive
            ? 'fill-error-500 stroke-white'
            : 'fill-grayish-500 stroke-white',
        )}
      />
      {variant !== 'icon' && (
        <span className='text-grayish-900 max-xl:hidden'>{t('wishlist')}</span>
      )}
    </button>
  );
}
