'use client';
import { useState } from 'react';

import ImagePlaceholder from '@/components/shared/MediaPreview/ImagePlaceholder';
import { Skeleton } from '@/components/ui/skeleton';

import { ALLOWED_IMGS_TYPES, ALLOWED_VIDS_TYPES } from '@/constants/media';

import { cn } from '@/lib/utils';

type MediaPreviewProps = {
  url: string | null;
  className?: string;
  fallbackIconClassName?: string;
  isIcon?: boolean;
};

export default function MediaPreview({
  url,
  className,
  fallbackIconClassName,
  isIcon,
}: MediaPreviewProps) {
  // Strip query strings and hash fragments before extracting the extension
  const rawExt = url
    ? new URL(url, 'http://x').pathname.split('.').pop()?.toLowerCase()
    : undefined;
  const extension = rawExt ? `.${rawExt}` : '';

  const isImageMedia = ALLOWED_IMGS_TYPES.includes(extension || '');
  const isVideoMedia = ALLOWED_VIDS_TYPES.includes(extension || '');

  const isNotSupportedMedia = !isImageMedia && !isVideoMedia;

  const [mediaHasError, setMediaHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    if (url) {
      return isImageMedia || isVideoMedia;
    }
    return false;
  });

  return (
    <div
      className={cn(
        'relative h-[19.8rem] w-[33.25rem] overflow-hidden rounded-sm',
        {
          'flex items-center justify-center bg-grayish-100':
            !url || mediaHasError || isNotSupportedMedia,
        },
        className,
      )}
    >
      {url ? (
        mediaHasError ? (
          <ImagePlaceholder
            messageKey={!isIcon ? 'cantLoadMedia' : undefined}
          />
        ) : isImageMedia ? (
          <>
            {isLoading && (
              <Skeleton className='absolute inset-0 z-10 size-full rounded-none' />
            )}
            <img
              key={url}
              src={url}
              alt={'Media'}
              decoding='async'
              className={cn('size-full object-cover', {
                'opacity-0': isLoading,
              })}
              ref={(img) => {
                // Handle cached images where onLoad never fires
                if (img?.complete) setIsLoading(false);
              }}
              onError={() => {
                setMediaHasError(true);
                setIsLoading(false);
              }}
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : isVideoMedia ? (
          <>
            {isLoading && (
              <Skeleton className='absolute inset-0 z-10 size-full' />
            )}
            <video
              key={url}
              controls
              src={url}
              className={cn('size-full object-cover', {
                'opacity-0': isLoading,
              })}
              onError={() => {
                setMediaHasError(true);
                setIsLoading(false);
              }}
              onLoadedData={() => setIsLoading(false)}
            />
          </>
        ) : (
          <ImagePlaceholder
            iconClassName={fallbackIconClassName}
            messageKey={!isIcon ? 'mediaNotSupported' : undefined}
          />
        )
      ) : (
        <ImagePlaceholder
          messageKey={!isIcon ? 'noMediaUploaded' : undefined}
        />
      )}
    </div>
  );
}
