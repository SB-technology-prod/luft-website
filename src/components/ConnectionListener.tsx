'use client';

import { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

export default function ConnectionListener() {
  const t = useTranslations('connection');
  const wasOffline = useRef(false);

  useEffect(() => {
    const handleOffline = () => {
      wasOffline.current = true;
      toast.error(t('lost'), {
        id: 'offline-toast',
        duration: Infinity,
        dismissible: false,
        closeButton: false,
      });
    };

    const handleOnline = () => {
      if (wasOffline.current) {
        toast.success(t('restored'), {
          id: 'online-toast',
          duration: 3000,
        });
        toast.dismiss('offline-toast');
        wasOffline.current = false;
      }
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [t]);

  return null;
}
