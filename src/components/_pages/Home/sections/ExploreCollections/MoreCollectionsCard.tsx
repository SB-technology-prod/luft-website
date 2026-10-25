import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

type MosaicTile = {
  // box position & size as a percentage of the mosaic
  left: number;
  top: number;
  size: number;
  rotate: number;
  // image bounding box as a percentage of the tile
  img: { left: number; top: number; width: number; height: number };
  flipped?: boolean;
};

const BIG_TILE = 56.34;
const SMALL_TILE = 27.23;

// diamond mosaic from the design, the first tile is the center one (painted below the rest)
const MOSAIC_TILES: MosaicTile[] = [
  {
    left: 21.83,
    top: 21.83,
    size: BIG_TILE,
    rotate: -45,
    img: { left: -45.41, top: -104.13, width: 290.82, height: 208.25 },
  },
  {
    left: 50.94,
    top: 7.28,
    size: SMALL_TILE,
    rotate: -45,
    img: { left: -25.68, top: -167.7, width: 251.37, height: 335.39 },
  },
  {
    left: 65.49,
    top: 50.94,
    size: SMALL_TILE,
    rotate: 45,
    img: { left: -113.88, top: -71.54, width: 227.76, height: 343.08 },
  },
  {
    left: 21.83,
    top: 65.49,
    size: SMALL_TILE,
    rotate: 135,
    flipped: true,
    img: { left: -68.79, top: -112.53, width: 337.59, height: 225.06 },
  },
  {
    left: 7.28,
    top: 21.83,
    size: SMALL_TILE,
    rotate: -135,
    flipped: true,
    img: { left: -102.58, top: -22.85, width: 192.63, height: 288.94 },
  },
  {
    left: 72.77,
    top: 0,
    size: SMALL_TILE,
    rotate: -45,
    img: { left: -16.51, top: -250.26, width: 233.03, height: 414.27 },
  },
  {
    left: 72.77,
    top: 72.77,
    size: SMALL_TILE,
    rotate: 45,
    img: { left: -106.76, top: -60.14, width: 213.52, height: 320.28 },
  },
  {
    left: 0,
    top: 72.77,
    size: SMALL_TILE,
    rotate: 135,
    flipped: true,
    img: { left: 2.81, top: -145.78, width: 194.37, height: 291.55 },
  },
  {
    left: 0,
    top: 0,
    size: SMALL_TILE,
    rotate: -135,
    flipped: true,
    img: { left: -97.71, top: -46.27, width: 195.43, height: 292.54 },
  },
  {
    left: 65.49,
    top: 21.83,
    size: SMALL_TILE,
    rotate: -45,
    img: { left: -60.21, top: -106.81, width: 320.42, height: 213.61 },
  },
  {
    left: 50.94,
    top: 65.49,
    size: SMALL_TILE,
    rotate: 45,
    img: { left: -106.16, top: -13.11, width: 319.64, height: 226.22 },
  },
  {
    left: 7.28,
    top: 50.94,
    size: SMALL_TILE,
    rotate: 135,
    flipped: true,
    img: { left: 7.18, top: -106.29, width: 185.64, height: 281.4 },
  },
  {
    left: 21.83,
    top: 7.28,
    size: SMALL_TILE,
    rotate: -135,
    img: { left: -38.06, top: -171.23, width: 276.11, height: 342.47 },
  },
];

const toPercent = (value: number) => `${value}%`;

type MoreCollectionsCardProps = {
  count: number;
  className?: string;
};

export default function MoreCollectionsCard({
  count,
  className,
}: MoreCollectionsCardProps) {
  const t = useTranslations('sections.exploreCollections');

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl bg-grayish-900 shadow-[0px_0px_21.8px_-4.36px_rgba(147,73,7,0.05)] xl:rounded-[2rem]',
        className,
      )}
    >
      {/* mosaic */}
      <div
        aria-hidden
        className='absolute left-1/2 top-[3.75rem] aspect-square w-full max-w-[12.5rem] -translate-x-1/2 xl:top-[10.2rem] xl:max-w-[19.05rem]'
      >
        {MOSAIC_TILES.map(({ left, top, size, rotate, img, flipped }, i) => (
          <div
            key={i}
            className='absolute flex aspect-square items-center justify-center'
            style={{
              left: toPercent(left),
              top: toPercent(top),
              width: toPercent(size),
            }}
          >
            <div
              className='relative size-[70.71%] shrink-0 overflow-hidden rounded-lg bg-white'
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <div
                className={cn('absolute', { '-scale-100': flipped })}
                style={{
                  left: toPercent(img.left),
                  top: toPercent(img.top),
                  width: toPercent(img.width),
                  height: toPercent(img.height),
                }}
              >
                <Image
                  src={`/images/collections/mosaic-${i + 1}.jpg`}
                  alt=''
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* texts */}
      <div className='absolute inset-x-3 bottom-16 flex flex-col items-center gap-2 text-center md:inset-x-3 md:bottom-6 xl:inset-x-6 xl:bottom-8'>
        <div className='flex flex-col items-center gap-1 font-medium'>
          <span className='text-[1.75rem] leading-9 tracking-[-0.044rem] text-primary-50 md:text-[2rem] md:leading-[2.625rem] md:tracking-[-0.05rem] xl:text-5xl xl:leading-[3.625rem] xl:tracking-[-0.075rem]'>
            {t('moreCount', { count })}
          </span>
          <span className='text-lg leading-[1.6875rem] tracking-[-0.017rem] text-grayish-50 md:text-xl md:leading-[1.625rem] md:tracking-[-0.019rem] xl:text-2xl xl:leading-[1.9375rem] xl:tracking-[-0.0225rem]'>
            {t('moreCollections', { count })}
          </span>
        </div>
        <p className='leading-[1.3125rem] text-grayish-100 max-md:hidden'>
          {t('moreDescription')}
        </p>
      </div>
    </div>
  );
}
