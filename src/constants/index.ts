export const DEFAULT_IMAGE_URL = 'https://placehold.co/800?text=No+Image';

export const PAGES = [
  { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
  { labelEn: 'For Owners', labelAr: 'للملاك', href: '/owners' },
  { labelEn: 'About us', labelAr: 'معلومات عنا', href: '/about' },
  { labelEn: 'Contact Us', labelAr: 'تواصل معنا', href: '/contact' },
] as const;

import { getTranslations } from 'next-intl/server';

export type TFunction = Awaited<ReturnType<typeof getTranslations>>;
