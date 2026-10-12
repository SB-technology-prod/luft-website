import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

export function PropertyWishlistCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-4', className)}>
      {/* Image Skeleton */}
      <Skeleton className='aspect-[175/143] w-full rounded-3xl md:aspect-auto md:h-[17.94rem]' />

      {/* Info Skeleton */}
      <div className='flex w-full flex-col gap-2'>
        {/* name */}
        <Skeleton className='h-[1.625rem] w-4/5 rounded-md' />
        {/* description */}
        <Skeleton className='h-[1.3125rem] w-full rounded-md' />
        {/* price and rating */}
        <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
          <Skeleton className='h-[1.625rem] w-24 rounded-md' />
          <Skeleton className='h-[1.625rem] w-20 rounded-md' />
        </div>
      </div>
    </div>
  );
}

export default PropertyWishlistCardSkeleton;
