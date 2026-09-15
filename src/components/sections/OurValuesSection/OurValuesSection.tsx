import { Minus, Plus } from 'lucide-react';

import AccordionElement from '@/components/shared/AccordionItem';
import CustomHorizontalAccordion from '@/components/shared/CustomHorizontalAccordion';
import { Accordion } from '@/components/ui/accordion';

type OurValuesData = {
  id: string;
  number?: string;
  title: string;
  description: string;
};

type OurValuesSectionProps = {
  title: string;
  items: OurValuesData[];
};

const OurValuesSection = ({ title, items }: OurValuesSectionProps) => {
  const SectionTitle = title;

  return (
    <div className='overflow-x-hidden'>
      <h2 className='mb-12 line-clamp-3 text-center text-5xl font-medium text-grayish-900'>
        {SectionTitle}
      </h2>
      <Accordion
        type='single'
        collapsible
        defaultValue='shipping'
        className='flex w-full max-w-full flex-col gap-4 xl:hidden'
      >
        {items.map(({ id, title, description }, i) => (
          <AccordionElement
            key={id}
            value={id}
            className='flex w-full max-w-full flex-col gap-4 overflow-auto rounded-3xl border-b-0 bg-grayish-50 transition-all hover:no-underline data-[state=closed]:p-8 data-[state=open]:px-10 data-[state=open]:py-6'
            trigger={
              <>
                <span className='text-lg font-medium text-grayish-900 md:text-xl'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  title={title}
                  className='line-clamp-1 overflow-hidden text-lg font-medium text-grayish-900 md:text-xl'
                >
                  {title}
                </span>
              </>
            }
            closeIcon={<Plus className='size-8 shrink-0 text-grayish-900' />}
            openIcon={<Minus className='size-8 shrink-0 text-grayish-900' />}
            triggerClassName='max-w-full'
          >
            <p className='line-clamp-[7] whitespace-pre-wrap text-grayish-400 md:text-lg'>
              {description}
            </p>
          </AccordionElement>
        ))}
      </Accordion>

      <div className='max-xl:hidden'>
        <CustomHorizontalAccordion
          items={items}
          itemClassName='p-10 h-[411px]'
        />
      </div>
    </div>
  );
};

export default OurValuesSection;
