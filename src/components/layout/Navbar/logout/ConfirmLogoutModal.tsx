'use client';

import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import ConfirmModal from '@/components/shared/ConfirmModal';

import { SetState } from '@/types';

import { signOut } from '@/app/[locale]/(auth)/actions';
import { useRouter } from '@/i18n/routing';

type ConfirmLogoutModalProps = {
  token: string;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
};

export default function ConfirmLogoutModal({
  isOpen,
  setIsOpen,
}: ConfirmLogoutModalProps) {
  const tLogout = useTranslations('auth.logout');
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: signOut,
    onSettled: () => {
      router.push('/login');
    },
  });

  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={mutate}
      onCancel={() => setIsOpen(false)}
      isActionsDisabled={isPending || isSuccess}
    >
      <div className='flex flex-col items-center gap-6'>
        <img
          src='images/auth/logoutConfirm.png'
          alt='Logout'
          width={98.73619842529297}
          height={185}
        />
        <div className='flex flex-col items-center gap-2 text-center'>
          <h4 className='text-xl font-medium'>{tLogout('title')}</h4>
          <p className='text-grayish-400'>{tLogout('logBack')}</p>
        </div>
      </div>
    </ConfirmModal>
  );
}
