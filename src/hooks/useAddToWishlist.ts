import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addToWishlist } from '@/api/wishlist';
import { wishlistQueryKey } from '@/api/wishlist';

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: string) => addToWishlist(propertyId),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [wishlistQueryKey] });
      toast.success(res?.message);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
}
