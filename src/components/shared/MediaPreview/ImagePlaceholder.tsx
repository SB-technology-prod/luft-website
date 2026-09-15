'use client';
import { useTranslations } from 'next-intl';

import ImageIcon from '@/components/icons/ImageIcon';

import { cn } from '@/lib/utils';

type ImagePlaceholderProps = {
  messageKey?: 'cantLoadMedia' | 'noMediaUploaded' | 'mediaNotSupported';
  iconClassName?: string;
};

export default function ImagePlaceholder({
  messageKey,
  iconClassName,
}: ImagePlaceholderProps) {
  const t = useTranslations('common');

  return (
    <div className='flex size-full flex-col items-center justify-center gap-1.5'>
      <ImageIcon className={cn('size-6', iconClassName)} />
      {messageKey && (
        <p className='text-sm font-medium text-grayish-400'>{t(messageKey)}</p>
      )}
    </div>
  );
}
