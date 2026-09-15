'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ChevronDown, Heart, Settings } from 'lucide-react';

import KeyIcon from '@/components/icons/KeyIcon';
import Dropdown from '@/components/shared/Dropdown';
import UserImg from '@/components/shared/UserImg';

import ConfirmLogoutModal from './logout/ConfirmLogoutModal';

import useSession from '@/hooks/useSession';

import { DropDownItem } from '@/types/components';

import { Dir } from '@/i18n/i18n.config';
import { cn } from '@/lib/utils';

type UserDropdownProps = {
  dir?: Dir;
};

export default function UserDropdown({ dir }: UserDropdownProps) {
  const router = useRouter();
  const t = useTranslations('common');
  const session = useSession();
  const token = session?.accessToken ?? '';

  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const userItems: DropDownItem[] = [
    {
      label: t('navLinks.settings'),
      disabled: false,
      onClick: () => router.push('/account/settings'),
      icon: <Settings className='!size-5' />,
    },
    {
      label: t('navLinks.reservations'),
      disabled: true,
      onClick: () => {},
      icon: <KeyIcon className='!size-5' />,
    },
    {
      label: t('navLinks.wishlist'),
      disabled: true,
      onClick: () => {},
      icon: <Heart className='!size-5 fill-grayish-900' />,
    },
    {
      label: t('logout'),
      onClick: () => setIsConfirmLogoutOpen(true),
      className: 'mt-4',
    },
  ];

  return (
    <>
      <UserImg className='md:hidden' />

      <div className='max-md:hidden'>
        <Dropdown
          dir={dir}
          isOpen={isDropdownOpen}
          setIsopen={setisDropdownOpen}
          items={userItems}
          className='rounded-lg border-0 py-4'
          itemClassName='py-2.5 px-4 !hover:bg-grayish-100 disabled:opacity-50'
          align='center'
          trigger={
            <div className='flex items-center gap-2'>
              <UserImg />
              <ChevronDown
                className={cn('size-6 stroke-grayish-400 transition-all', {
                  'rotate-180': isDropdownOpen,
                })}
              />
            </div>
          }
          triggerClassName='focus:outline-none'
        />
        <ConfirmLogoutModal
          token={token}
          isOpen={isConfirmLogoutOpen}
          setIsOpen={setIsConfirmLogoutOpen}
        />
      </div>
    </>
  );
}
