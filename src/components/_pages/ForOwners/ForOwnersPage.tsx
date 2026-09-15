import CardsSection from '@/components/sections/CardsSection';
import ConciergeSectionPreview from '@/components/sections/ConciergeSection/ConciergeSection';
import FaqsSection from '@/components/sections/FaqsSection';
import PartnersSection from '@/components/sections/PartnersSection';
import PromiseSectionPreview from '@/components/sections/PromiseSection/PromiseSection';

import HeroSection from './Sections/Hero';

import { ForOwnersPageSections } from '@/types/page';

export default function ForOwnersPage({
  concierge,
  promise,
  hero,
  cards,
  faQs,
  partnersSection,
}: ForOwnersPageSections) {
  return (
    <div className='w-full bg-white'>
      <div className='container mb-20 mt-10 md:mb-[7.5rem] md:mt-20 lg:mb-[8.75rem]'>
        <HeroSection {...hero} />
      </div>
      <div className='my-20 bg-grayish-50 py-6 md:my-[7.5rem] md:py-12 xl:my-[8.75rem] xl:py-20'>
        <div className='container'>
          <ConciergeSectionPreview {...concierge} />
        </div>
      </div>
      <div className='container my-20 md:my-[7.5rem] xl:my-[8.75rem]'>
        <PromiseSectionPreview {...promise} />
      </div>
      <div className='container my-20 md:my-[7.5rem] xl:my-[8.75rem]'>
        <CardsSection {...cards} />
      </div>
      <div className='container my-20 md:my-[7.5rem] xl:my-[8.75rem]'>
        <FaqsSection {...faQs} />
      </div>
      <div className='container mb-[12.125rem] mt-20 md:mt-[7.5rem] lg:mb-[1.75rem] xl:mt-[8.75rem]'>
        <PartnersSection {...partnersSection} />
      </div>
    </div>
  );
}
