import { SendMessageFormData } from '@/types/page';

import { apiFetch } from '@/utils/api';

import { Locale } from '@/i18n/i18n.config';

export const getLayoutData = (locale: Locale) =>
  apiFetch(
    'api/CMS/get-pages-public',
    {
      headers: {
        language: locale,
      },
    },
    false,
  );

export const getPageSections = ({
  locale,
  pageId,
}: {
  locale: Locale;
  pageId: string;
}) =>
  apiFetch(
    `api/CMS/get-all-cms?PageId=${pageId}`,
    {
      headers: {
        language: locale,
      },
    },
    false,
  );

export const sendMessage = (data: SendMessageFormData) =>
  apiFetch(
    'api/ContactUs/sendContactUsMessage',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
