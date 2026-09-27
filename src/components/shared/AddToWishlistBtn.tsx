'use client';

import { useTranslations } from 'next-intl';

import { Heart } from 'lucide-react';

import useSession from '@/hooks/useSession';
import { useAddToWishlist } from '@/hooks/useAddToWishlist';
import { useRemoveFromWishlist } from '@/hooks/useRemoveFromWishlist';
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

  const isPending = isAdding || isRemoving;

  if (!session) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!propertyId || isPending) return;
    if (isWishlisted) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(propertyId);
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
          isWishlisted
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
