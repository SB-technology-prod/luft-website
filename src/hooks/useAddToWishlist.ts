import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addToWishlist } from '@/api/wishlist';
import { wishlistQueryKey } from '@/api/wishlist';

export function useAddToWishlist() {
  const t = useTranslations('pages.wishlist');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: string) => addToWishlist(propertyId),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [wishlistQueryKey] });
      toast.success(res?.message);
    },
    onError: (err: any) => {
      // Network failures surface as a raw "Failed to fetch" TypeError
      toast.error(
        err instanceof TypeError || !err?.message
          ? t('updateFailed')
          : err.message,
      );
    },
  });
}
