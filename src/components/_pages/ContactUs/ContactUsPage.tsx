import BannerSection from '@/components/sections/BannerSection';

import ContactInfoSection from './sections/ContactInfoSection';
import SendMessageSection from './sections/SendMessageSection';

import { ContactUsPageSections } from '@/types/page';

export default function ContactUsPage({
  banner,
  contactInformationSection,
}: ContactUsPageSections) {
  return (
    <div className='flex w-full flex-col'>
      <BannerSection {...banner} />
      <div className='container mb-[4.25rem] mt-5 flex justify-between gap-6 max-md:flex-col md:mb-40 md:mt-10 md:gap-12 lg:mb-[7.25rem] lg:mt-20 lg:gap-[8.5rem]'>
        <div className='w-full flex-1'>
          <SendMessageSection />
        </div>
        <div className='h-fit w-full md:w-[23.75rem] lg:w-[26rem]'>
          <ContactInfoSection {...contactInformationSection} />
        </div>
      </div>
    </div>
  );
}
