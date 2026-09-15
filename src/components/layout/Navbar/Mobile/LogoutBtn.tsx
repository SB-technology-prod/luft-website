'use client';
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import ConfirmLogoutModal from '../logout/ConfirmLogoutModal';

import QueryClientProvider from '@/providers/QueryClientProvider';

export default function LogoutBtn({ token }: { token: string }) {
  const [isConfirmOpen, setisConfirmOpen] = useState(false);
  const t = useTranslations('common');
  return (
    <QueryClientProvider>
      <button
        className='w-fit text-grayish-900'
        type='button'
        onClick={() => setisConfirmOpen(true)}
      >
        {t('logout')}
      </button>
      <ConfirmLogoutModal
        isOpen={isConfirmOpen}
        setIsOpen={setisConfirmOpen}
        token={token}
      />
    </QueryClientProvider>
  );
}
