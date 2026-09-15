import { ApiResponse } from '.';

export enum SECTION_TYPE_ENUM {
  Hero = 0,
  Concierge = 1,
  Promise = 2,
  Banner = 3,
  AboutUs = 4,
  OurValues = 5,
  MediaContentSection = 6,
  HowItWorks = 7,
  PerfectStaySection = 8,
  ContactInformationSection = 9,
}

export enum PageTypeEnum {
  Home = 1,
  AboutUs = 2,
  ForOwners = 3,
  ContactUs = 4,
  Services = 5,
}

export type PageApiResponse = ApiResponse<{
  pageTitle: string;
  pageType: PageTypeEnum;
  sections:
    | ContactUsPageSections
    | AboutPageSections
    | HomePageSections
    | ForOwnersPageSections;
}>;

type BaseSection = {
  id: string;
  order: number;
  cmsPageId: string;
  sectionType: SECTION_TYPE_ENUM;
};

export type AboutUsSection = BaseSection & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaExtension: string;
};

export type BannerSection = BaseSection & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaExtension: string;
};

export type OurValuesSection = BaseSection & {
  title: string;
  items: OurValueItem[];
};

export type OurValueItem = {
  id: string;
  title: string;
  description: string;
};

export type MediaContentSection = BaseSection & {
  mediaUrl: string;
  mediaExtension: string;
  items: MediaContentItem[];
};

export type MediaContentItem = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type HowItWorksSection = BaseSection & {
  title: string;
  description: string;
  items: HowItWorksItem[];
};

export type HowItWorksItem = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
  mediaExtension: string;
};

export type PerfectStaySection = BaseSection & {
  title: string;
  description: string;
  items: unknown[];
};

export type AboutPageSections = {
  aboutUs: AboutUsSection;
  banner: BannerSection;
  ourValues: OurValuesSection;
  mediaContentSection: MediaContentSection;
  howItWorks: HowItWorksSection;
  perfectStaySection: PerfectStaySection;
};

export type ContactUsPageSections = {
  banner: BannerSection;
  contactInformationSection: ContactUsSectionRes;
};

export type HomePageSections = {
  hero: HeroSectionRes;
  concierge: ConciergeSectionRes;
  promise: PromiseSectionRes;
};

export type ForOwnersPageSections = {
  hero: HeroSectionRes;
  concierge: ConciergeSectionRes;
  promise: PromiseSectionRes;
  cards: CardsSectionRes;
  faQs: FaqsSectionRes;
  partnersSection: PartnersSectionRes;
};

export type SendMessageFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
};

export type ContactUsData = {
  id: string;
  iconUrl: string;
  title: string;
  mediaExtension: string;
  description: string;
};
export type socialsItemData = {
  id: string;
  iconUrl: string;
  title: string;
  socials: {
    id: string;
    iconUrl: string;
    url: string;
    name: string;
  }[];
};

export type ContactUsSectionRes = BaseSection & {
  title: string;
  secondaryHeading: string;
  description: string;
  items: ContactUsData[];
  socialsItem: socialsItemData;
};

export type HeroSectionRes = BaseSection & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaExtension: string;
};

export type ConciergeSectionRes = BaseSection & {
  title: string;
  description: string;
  items: ConciergeItemRes[];
};

export type ConciergeItemRes = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
};

export enum MediaPositionEnum {
  START = 1,
  END = 2,
}

export type PromiseSectionRes = BaseSection & {
  title: string;
  description: string;
  items: BulletRes[];
  mediaUrl: string;
  mediaExtension: string;
  mediaPosition: MediaPositionEnum;
};

export type BulletRes = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
};

export type CardItem = {
  id: string;
  iconUrl: string;
  mediaExtension: string;
  title: string;
};

export type CardsSectionRes = BaseSection & {
  title: string;
  description: string;
  items: CardItem[];
};

export type FaqItemRes = {
  id: string;
  title: string;
  description: string;
};

export type FaqsSectionRes = BaseSection & {
  title: string;
  description: string;
  items: FaqItemRes[];
};

export type ReviewItem = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
  mediaExtension: string;
  reviewText: string;
};

export type PartnersSectionRes = BaseSection & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaExtension: string;
  items: ReviewItem[];
};
