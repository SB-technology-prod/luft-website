'use client';
import { useTranslations } from 'next-intl';

import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareBtn() {
  const t = useTranslations('pages.propertyDetails.actions');
  const currentUrl = window.location.href;

  return (
    <button
      onClick={() => {
        if (navigator.share) {
          navigator
            .share({
              title: t('shareProperty'),
              text: t('shareProperty'),
              url: currentUrl,
            })
            .catch((err) => console.log(err));
        } else {
          navigator.clipboard.writeText(currentUrl);
          toast.info(t('linkCopied'));
        }
      }}
      className='flex items-center gap-2'
    >
      <Upload className='size-6 text-grayish-400' />
      <span className='text-grayish-900 max-xl:hidden'>{t('share')}</span>
    </button>
  );
}
