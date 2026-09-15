import { ApiResponse } from '.';

export type LayoutDataResponse = ApiResponse<{
  pages: Page[];
  contactInfo: ContactInfo;
}>;

export type Page = {
  id: string;
  title: string;
  pageType: number;
};

export type ContactInfo = {
  items: ContactItemProps[];
  socials: SocialMediaLink[];
};

export type ContactItemProps = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
};

export type SocialMediaLink = {
  id: string;
  name: string;
  url: string;
  iconUrl: string;
};
