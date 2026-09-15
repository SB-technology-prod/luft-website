'use client';

import { useTranslations } from 'next-intl';

import { Heart, Menu } from 'lucide-react';

import GearIcon from '@/components/icons/GearIcon';
import KeyIcon from '@/components/icons/KeyIcon';
import RatedByGuests from '@/components/shared/RatedByGuests';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

import SocialMediaItem from '../../Footer/SocialMediaItem';
import CurrencySelect from '../CurrencySelect';
import LanguageSwitcher from '../LanguageSwitcher';

import LogoutBtn from './LogoutBtn';
import MobileNavLink from './MobileNavLink';
import UserLink from './UserSetting';

import useSession from '@/hooks/useSession';

import { Page, SocialMediaLink } from '@/types/layout';

function MobileNavSheet({
  socialLinks,
  navLinks,
}: {
  socialLinks: SocialMediaLink[];
  navLinks: Page[];
}) {
  const t = useTranslations();
  const session = useSession();
  const token = session?.accessToken ?? '';

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6' />
      </SheetTrigger>
      <SheetContent className='flex w-10/12 min-w-fit flex-col justify-between overflow-auto bg-white p-0 sm:max-w-full [&>button]:rtl:left-4 [&>button]:rtl:right-auto [&>button]:w-fit'>
        <div className='flex flex-col gap-4 px-4 pt-4'>
          <div className='flex flex-col gap-4'>
            {navLinks.map(({ title, id }) => (
              <MobileNavLink
                key={id}
                title={title}
                id={id}
              />
            ))}
          </div>
          <hr className='text-grayish-100' />
          <div className='flex flex-col gap-[1.1rem]'>
            <UserLink
              label={t('common.navLinks.settings')}
              icon={<GearIcon className='!size-6 fill-grayish-500' />}
              href='/account/settings'
            />

            <UserLink
              label={t('common.navLinks.reservations')}
              icon={<KeyIcon className='!size-6 fill-grayish-500' />}
              href='reservations'
            />
            <UserLink
              label={t('common.navLinks.wishlist')}
              icon={
                <Heart className='!size-6 fill-grayish-500 stroke-grayish-500' />
              }
              href='whishlist'
            />
          </div>
          <hr className='text-grayish-100' />
          <CurrencySelect variant='mobile' />
          <LanguageSwitcher />
          {token && <LogoutBtn token={token} />}
        </div>
        <SheetFooter className='flex !flex-col bg-grayish-50 px-4 py-4'>
          <RatedByGuests
            textClassName='text-sm'
            color='var(--ps-neutral-500)'
          />
          <div className='mt-6 flex items-center gap-5'>
            {socialLinks.map(({ iconUrl, url, id }) => (
              <SocialMediaItem
                key={id}
                {...{ iconUrl, url }}
              />
            ))}
          </div>
          <hr className='my-2 text-grayish-100' />
          <div className='flex flex-col gap-2.5 text-sm text-grayish-500'>
            <p>{t('footer.termsOfService')}</p>
            <p>{t('footer.allRightsReserved')}</p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
