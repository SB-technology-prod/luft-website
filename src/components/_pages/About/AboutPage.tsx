import AboutSection from '@/components/sections/AboutSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import MediaContentSection from '@/components/sections/MediaContentSection';
import OurValuesSection from '@/components/sections/OurValuesSection/OurValuesSection';
import PerfectStaySection from '@/components/sections/PerfectStaySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection/TestimonialsSection';

import BannerSection from '../../sections/BannerSection';

import { AboutPageSections } from '@/types/page';

export default function AboutPage({
  aboutUs,
  banner,
  ourValues,
  mediaContentSection,
  howItWorks,
  perfectStaySection,
}: AboutPageSections) {
  return (
    <div className='flex w-full flex-col bg-grayish-30'>
      <BannerSection {...banner} />
      <div className='container pt-20'>
        <AboutSection {...aboutUs} />

        <div className='my-16 md:my-[7.5rem] xl:my-[8.75rem]'>
          <OurValuesSection {...ourValues} />
        </div>
        <div className='my-16 md:my-[7.5rem] xl:my-[8.75rem]'>
          <MediaContentSection {...mediaContentSection} />
        </div>

        <div className='my-16 md:my-[7.5rem] xl:my-[8.75rem]'>
          <TestimonialsSection />
        </div>
        <div className='my-16 md:my-[7.5rem] xl:my-[8.75rem]'>
          <HowItWorksSection {...howItWorks} />
        </div>
      </div>
      <div className='bg-grayish-50 py-10'>
        <PerfectStaySection {...perfectStaySection} />
      </div>
    </div>
  );
}
