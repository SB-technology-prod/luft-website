import Logo from '@/components/icons/Logo';

import MobileNavSheet from './Mobile/MobileNavSheet';
import NavLink from './NavLinks/NavLink';
import CurrencySelect from './CurrencySelect';
import LanguageSwitcher from './LanguageSwitcher';
import LoginNavBtn from './LoginNavBtn';
import UserDropdown from './UserDropdown';

import { Page, SocialMediaLink } from '@/types/layout';

import { getServerSession } from '@/utils/session';

import { Locale } from '@/i18n/i18n.config';
import { Link } from '@/i18n/routing';

export default async function Navbar({
  locale,
  navLinks,
  socialLinks,
}: {
  locale: Locale;
  navLinks: Page[];
  socialLinks: SocialMediaLink[];
}) {
  const session = await getServerSession();
  const isAuth = !!session?.accessToken || !!session?.refreshToken;

  const userName = session?.user?.name ?? '';
  const token = session?.accessToken ?? '';

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className='flex items-center justify-between border-y border-grayish-50 bg-white px-6 py-3.5 lg:px-[4.5rem]'>
      <div className='flex items-center gap-8 max-md:gap-6'>
        <div className='h-fit md:hidden'>
          <MobileNavSheet
            socialLinks={socialLinks}
            navLinks={navLinks}
          />
        </div>
        <Link href='/'>
          <Logo className='h-8 w-20' />
        </Link>
        <div className='max-md:hidden'>
          <div className='flex items-center gap-6'>
            {navLinks.map(({ title, id, pageType }) => (
              <NavLink
                key={title}
                {...{ title, id, pageType }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex h-full items-center gap-2'>
        <div className='flex h-full items-center gap-2 px-3 max-md:hidden'>
          <LanguageSwitcher />
          <span className='h-6 w-px bg-grayish-200' />
          <CurrencySelect />
        </div>

        {isAuth ? (
          <UserDropdown {...{ userName, token, dir }} />
        ) : (
          <LoginNavBtn />
        )}
      </div>
    </div>
  );
}
