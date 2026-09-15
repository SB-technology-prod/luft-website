import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

function StarRating({
  rating,
  size = 'sm',
  className,
}: {
  rating: number;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div className={cn('flex gap-2', className)}>
      {[...Array(5)].map((_, i) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - i) * 100));

        return (
          <div
            key={i}
            className={`relative ${sizeClass}`}
          >
            <Star
              className={`${sizeClass} fill-transparent stroke-grayish-900 text-transparent`}
            />
            {fillPercentage > 0 && (
              <div
                className='absolute start-0 top-0 h-full overflow-hidden'
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  className={`${sizeClass} max-w-none fill-grayish-900 stroke-grayish-900 text-grayish-900`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StarRating;
