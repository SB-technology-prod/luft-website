import WorkItem from './WorkItem';

import { HowItWorksSection as HowItWorksSectionType } from '@/types/page';

export default function HowItWorksSection({
  title,
  description,
  items,
}: HowItWorksSectionType) {
  return (
    <div className='flex flex-col items-center gap-12 text-center'>
      {/* Texts */}
      <div className='flex max-w-full flex-col gap-2 overflow-hidden'>
        <h3
          title={title}
          className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 xl:text-5xl xl:leading-[3.5rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='line-clamp-[7] whitespace-pre-wrap text-grayish-400 md:text-lg'
        >
          {description}
        </p>
      </div>

      {/* Work Items */}
      <div className='grid max-w-full grid-cols-[repeat(auto-fit,minmax(19.125rem,1fr))] gap-5 overflow-auto py-0.5'>
        {items.map((item) => (
          <WorkItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
