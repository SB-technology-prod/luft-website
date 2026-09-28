import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function PropertyWishlistCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex w-[10.94rem] flex-col gap-4 overflow-hidden md:w-[23.8rem] lg:w-[21.75rem]',
        className
      )}
    >
      {/* Image Skeleton */}
      <Skeleton className='h-[8.94rem] w-full rounded-3xl md:h-[17.94rem]' />

      {/* Info Skeleton */}
      <div className='flex w-full flex-col gap-2'>
        <Skeleton className='h-5 w-4/5 rounded-md md:h-6 lg:h-7' />
        <Skeleton className='h-4 w-3/5 rounded-md' />
        <div className='flex items-center gap-2 pt-1 max-sm:flex-col max-sm:items-start max-sm:gap-1.5'>
          <Skeleton className='h-5 w-24 rounded-md md:h-6' />
          <Skeleton className='h-5 w-16 rounded-md md:h-6' />
        </div>
      </div>
    </div>
  );
}

export default PropertyWishlistCardSkeleton;
