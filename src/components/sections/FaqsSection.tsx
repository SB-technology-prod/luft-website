import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FaqsSectionRes } from '@/types/page';

export default function FaqsSection({
  title,
  description,
  items,
}: FaqsSectionRes) {
  return (
    <div className='mx-auto flex w-full flex-col gap-0 md:gap-2 lg:gap-6'>
      <div className='flex max-w-full flex-col gap-2 overflow-hidden'>
        <h3 className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.625rem]'>
          {title}
        </h3>
        <p className='line-clamp-[7] whitespace-pre-wrap text-lg text-grayish-400'>
          {description}
        </p>
      </div>

      <Accordion
        type='single'
        collapsible
        className=''
        defaultValue={items[0]?.id}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className='border-grayish-100'
          >
            <AccordionTrigger className='line-clamp-3 flex py-6 text-start text-xl font-medium text-grayish-900 hover:no-underline md:text-2xl lg:text-[1.75rem] lg:leading-10'>
              <span className='line-clamp-3'>{item.title}</span>
            </AccordionTrigger>
            <AccordionContent className='line-clamp-[7] whitespace-pre-wrap pt-2 text-base font-medium text-grayish-400 md:pb-6 md:text-lg lg:text-xl'>
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
