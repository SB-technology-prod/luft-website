import { getTranslations } from 'next-intl/server';

import Logo from '@/components/icons/Logo';
import RatedByGuests from '@/components/shared/RatedByGuests';

import ContactItem from './ContactItem';
import FooterLink from './FooterLink';
import SocialMediaItem from './SocialMediaItem';

import { ContactItemProps, Page, SocialMediaLink } from '@/types/layout';

type FooterProps = {
  navLinks: Page[];
  socialMediaItems: SocialMediaLink[];
  contactItems: ContactItemProps[];
};

export default async function Footer({
  navLinks,
  socialMediaItems,
  contactItems,
}: FooterProps) {
  const t = await getTranslations();

  return (
    <div className='flex flex-col gap-6 bg-grayish-900 px-6 py-10 text-grayish-100 md:gap-16 lg:py-11 xl:gap-[7.5rem] xl:px-[4.5rem]'>
      <div className='flex justify-between gap-4 max-md:flex-col max-md:gap-6'>
        {/* First Column */}
        <div className='flex flex-col gap-6'>
          <Logo className='h-[3.75rem] w-[8.75rem] fill-white' />
          <p className='text-grayish-100 md:max-w-[21rem] md:text-lg'>
            {t('footer.tagline')}
          </p>
          <div className='flex flex-col gap-6 max-md:hidden'>
            <RatedByGuests
              textClassName='text-lg'
              color='var(--ps-neutral-100)'
            />
            <div className='flex items-center gap-5'>
              {socialMediaItems.map(({ iconUrl, id, url }) => (
                <SocialMediaItem
                  key={id}
                  {...{ iconUrl, url }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='flex gap-4 max-xl:max-w-[311px] max-xl:flex-1 max-md:flex-col max-sm:max-w-full xl:w-[40rem] xl:gap-10'>
          {/* Second Column */}
          <div className='flex flex-col gap-2 xl:flex-1'>
            <span className='text-sm leading-6'>{t('common.labels.menu')}</span>
            <div className='flex flex-col gap-4'>
              {navLinks.map(({ title, id, pageType }) => (
                <FooterLink
                  key={`footerLink-${id}`}
                  {...{ id, title, href: `/${id}`, pageType }}
                />
              ))}
            </div>
          </div>

          {/* Third Column */}
          <div className='flex flex-1 flex-col gap-4 overflow-hidden max-md:mt-6 xl:flex-1'>
            {contactItems.map(({ description, id, title }) => (
              <ContactItem
                key={id}
                label={title}
                value={description}
              />
            ))}
          </div>
        </div>

        <div className='mt-6 flex flex-col gap-6 md:hidden'>
          <RatedByGuests
            textClassName='md:text-lg'
            color='var(--ps-neutral-100)'
          />
          <div className='flex items-center gap-5'>
            {socialMediaItems.map(({ iconUrl, id, url }) => (
              <SocialMediaItem
                key={id}
                {...{ iconUrl, url }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between border-t border-grayish-600 pt-7 text-sm leading-6'>
        <p>{t('footer.termsOfService')}</p>
        <p>{t('footer.allRightsReserved')}</p>
      </div>
    </div>
  );
}
