'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

import MediaPreview from '../../../../shared/MediaPreview/MediaPreview';

import { ALLOWED_IMGS_TYPES, ALLOWED_VIDS_TYPES } from '@/constants/media';

import { cn } from '@/lib/utils';

interface MediaHeroProps {
  src: string;
  className?: string;
  extension: string;
}

const MediaHero = ({ src, className = '', extension }: MediaHeroProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Detect if the src is a video
  const isVideo = useMemo(() => {
    if (!src) return false;
    return ALLOWED_VIDS_TYPES.some((ext) => extension.endsWith(ext));
  }, [src]);

  // Detect if the src is an image
  const isImage = useMemo(() => {
    if (!src) return false;
    return ALLOWED_IMGS_TYPES.some((ext) => extension.endsWith(ext));
  }, [src]);

  useEffect(() => {
    if (videoRef.current && isVideo) {
      videoRef.current
        .play()
        .then(() => setVideoLoaded(true))
        .catch(() => setHasError(true));
    }
  }, [src, isVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => setHasError(true));
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {/* Media */}
      {isVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={cn('size-full object-cover')}
          onError={() => setHasError(true)}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src={src}
            type='video/mp4'
          />
          Your browser does not support the video tag.
        </video>
      ) : isImage ? (
        <div className={`relative size-full`}>
          <MediaPreview
            url={src}
            className='absolute inset-0 size-full object-cover'
          />
        </div>
      ) : (
        <div className={`flex w-full items-center justify-center bg-gray-200`}>
          <span className='text-gray-500'>Unsupported media type</span>
        </div>
      )}

      {/* Controls */}
      {isVideo && !hasError && (
        <>
          <div className='absolute bottom-6 left-6 max-sm:bottom-4 max-sm:left-4'>
            <button
              onClick={togglePlay}
              className='flex size-12 items-center justify-center rounded-full bg-white p-3 shadow-md backdrop-blur-md transition hover:scale-105 max-sm:size-10'
            >
              {isPlaying ? (
                <Pause
                  className='fill-grayish-900 stroke-1'
                  size={20}
                />
              ) : (
                <Play size={20} />
              )}
            </button>
          </div>

          <div className='absolute bottom-6 right-6 max-sm:bottom-4 max-sm:right-4'>
            <button
              onClick={toggleMute}
              className='flex size-12 items-center justify-center rounded-full bg-white p-3 shadow-md backdrop-blur-md transition hover:scale-105 max-sm:size-10'
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MediaHero;
