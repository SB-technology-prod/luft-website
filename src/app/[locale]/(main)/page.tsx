import { notFound } from 'next/navigation';

import HomePage from '@/components/_pages/Home/HomePage';

import { LayoutDataResponse } from '@/types/layout';
import { HomePageSections, PageApiResponse, PageTypeEnum } from '@/types/page';

import { getLayoutData, getPageSections } from '@/api/page';
import { Locale } from '@/i18n/i18n.config';

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const {
    result: { pages },
  }: LayoutDataResponse = await getLayoutData(locale as Locale);

  const homePage = pages.find((page) => page.pageType === PageTypeEnum.Home);

  if (!homePage) {
    notFound();
  }

  const {
    result: { sections },
  }: PageApiResponse = await getPageSections({
    locale: locale as Locale,
    pageId: homePage.id,
  });

  return <HomePage {...(sections as HomePageSections)} />;
};
export default Home;
