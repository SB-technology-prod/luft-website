const TestURL = 'https://luft-stay-web.vercel.app';
export const siteConfig = {
  name: 'Luft',
  url: TestURL,
  ogImage: TestURL + '/web-app-manifest-512x512.png',
  description:
    'Luft is a platform that helps you get residency in the country of your choice.',
};

export type SiteConfig = typeof siteConfig;
