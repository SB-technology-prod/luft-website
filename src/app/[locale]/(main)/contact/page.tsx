import { notFound } from 'next/navigation';

import ContactUsPage from '@/components/_pages/ContactUs/ContactUsPage';

import { type LayoutDataResponse } from '@/types/layout';
import {
  type ContactUsPageSections,
  type PageApiResponse,
  PageTypeEnum,
} from '@/types/page';

import { getLayoutData, getPageSections } from '@/api/page';
import { type Locale } from '@/i18n/i18n.config';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    result: { pages },
  }: LayoutDataResponse = await getLayoutData(locale as Locale);
  const contactPage = pages.find(
    (page) => page.pageType === PageTypeEnum.ContactUs,
  );

  if (!contactPage) notFound();

  const {
    result: { sections },
  }: PageApiResponse = await getPageSections({
    locale: locale as Locale,
    pageId: contactPage.id,
  });

  return <ContactUsPage {...(sections as ContactUsPageSections)} />;
}
