'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type StatusLayoutProps = {
  title: string;
  paragraph: string;
  mainImageSrc?: string;
  className?: string;
};

const StatusLayout = ({
  title,
  paragraph,
  mainImageSrc,
  className,
}: StatusLayoutProps) => {
  const params = useParams();
  const isEnglish = params.locale === 'en';
  return (
    <div
      className={cn(
        'mx-auto mb-44 mt-12 w-full px-4 md:mb-20 md:mt-20 md:px-6 lg:mb-32 lg:mt-16 lg:px-[4.5rem] 2xl:!w-[1296px] 2xl:p-0',
        className,
      )}
    >
      <div className='flex flex-col items-center justify-center'>
        <img
          src={mainImageSrc}
          alt={title}
          className='mx-auto h-auto w-auto'
        />

        <div
          className='mt-12 flex w-full items-center justify-between'
          dir='ltr'
        >
          <img
            src='/svg/leftArrow.svg'
            alt='left arrow'
            className='h-auto w-auto max-sm:hidden'
          />

          <div className='flex flex-1 flex-col items-center gap-2 text-center text-neutral-50'>
            <p className='text-[1.75rem] leading-9 tracking-[-0.025em] text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.75rem]'>
              {title}
            </p>
            <span className='text-grayish-400 md:text-lg'>{paragraph}</span>
          </div>

          <img
            src='/svg/rightArrow.svg'
            alt='right arrow'
            className='h-auto w-auto max-sm:hidden'
          />
        </div>

        <Button className='mt-[48px] h-[54px] min-w-[200px] cursor-pointer bg-grayish-900 px-4 py-2 text-grayish-50 hover:bg-grayish-800 hover:text-grayish-50'>
          <Link
            href={`/`}
            className='w-full'
          >
            {isEnglish ? 'Back To Home' : 'الرجوع للرئيسية'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StatusLayout;
