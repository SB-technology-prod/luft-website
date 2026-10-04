import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeFromWishlist } from '@/api/wishlist';
import { wishlistQueryKey } from '@/api/wishlist';

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: string) => removeFromWishlist(propertyId),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [wishlistQueryKey] });
      toast.success(res?.message);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
}
