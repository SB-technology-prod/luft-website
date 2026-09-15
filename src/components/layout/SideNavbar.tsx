import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Headset } from 'lucide-react';

import LOGO from '../../../public/svgs/logo.svg';
import Icon from '../shared/Icon';
import { Button } from '../ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

import { PAGES } from '@/constants';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
const SideNavbar = () => {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const pathName = usePathname();
  const t = useTranslations();
  const getLinkClassName = (href: string) => {
    const baseClasses =
      'relative text-sm text-grayish-200 transition-all duration-300 ease-in hover:text-white';
    const activeClass = 'text-white underline underline-offset-8';

    const isActive = href === '/' ? pathName === '/' : pathName.includes(href);

    return cn(baseClasses, isActive && activeClass);
  };
  return (
    <SheetContent
      className='flex flex-col border-none bg-primary-700 text-white'
      side={isEnglish ? 'right' : 'left'}
    >
      <SheetHeader>
        <SheetTitle>
          <div className='mb-6 flex items-center'>
            <Link href='/'>
              <Image
                src={LOGO}
                alt='logo'
                width={236}
                height={40}
                className='w-full'
              />
            </Link>
          </div>{' '}
        </SheetTitle>
      </SheetHeader>
      <ul className='mb-8 flex flex-col gap-4'>
        {PAGES.map(({ labelEn, labelAr, href }) => (
          <Link
            key={labelEn}
            href={href}
            prefetch={true}
          >
            <li className={getLinkClassName(href)}>
              {isEnglish ? labelEn : labelAr}
            </li>
          </Link>
        ))}
      </ul>
      <div className='mb-4 flex flex-col gap-4'>
        <Button asChild>
          <Link
            href='/contact'
            className='flex gap-x-2 px-6 max-xs:w-full xs:max-md:w-[303px]'
          >
            <span>{t('bookFreeConsultation')}</span>
            <Headset
              className='!size-6'
              absoluteStrokeWidth
            />
          </Link>
        </Button>{' '}
        <Link
          href='https://api.whatsapp.com/send?phone=201025818880'
          target='__blank'
          className='flex gap-2 text-grayish-50 hover:text-secondary-500 hover:underline'
        >
          <p className='text-secondary-600 underline decoration-secondary-800'>
            {t('messageUs')}
          </p>
          <Icon
            name='whatsapp'
            fill='#CDB187'
            className='!size-6'
          />
        </Link>
      </div>
    </SheetContent>
  );
};

export default SideNavbar;
