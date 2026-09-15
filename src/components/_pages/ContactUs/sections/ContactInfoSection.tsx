import MediaPreview from '@/components/shared/MediaPreview/MediaPreview';

import { ContactUsSectionRes } from '@/types/page';

const ContactInfoSection = ({
  title,
  secondaryHeading,
  description,
  items,
  socialsItem,
}: ContactUsSectionRes) => {
  return (
    <div className='flex h-fit w-full flex-col overflow-hidden rounded-3xl bg-grayish-30 p-8 pb-[3.25rem] md:pb-12 lg:pb-9'>
      <div className='mb-12 max-w-full overflow-hidden'>
        <h2 className='mb-2 text-xl font-medium leading-9 text-grayish-900 md:text-[1.5rem] lg:text-[1.75rem]'>
          {title}
        </h2>
        <p className='text-base text-grayish-400'>{description}</p>
      </div>
      <div className='flex max-w-full flex-col gap-8 overflow-hidden'>
        <h3 className='text-lg font-medium leading-8 text-grayish-900 md:text-xl lg:text-[1.5rem]'>
          {secondaryHeading}
        </h3>
        {items.map((item, index) => (
          <div
            key={index}
            className='flex flex-col gap-4'
          >
            <div className='flex items-center gap-2'>
              <MediaPreview
                url={item.iconUrl}
                className='h-5 w-5 bg-cover bg-center'
                isIcon={true}
              />
              <p className='text-base text-grayish-900'>{item.title}</p>
            </div>

            <p className='text-base text-grayish-400'>{item.description}</p>
          </div>
        ))}

        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <MediaPreview
              url={socialsItem?.iconUrl}
              className='h-5 w-5 bg-cover bg-center'
              isIcon={true}
            />
            <p className='text-base text-grayish-900'>{socialsItem?.title}</p>
          </div>

          <div className={`flex items-center gap-3`}>
            {socialsItem?.socials?.map((item) => (
              <a
                key={item.id || item.name}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex size-8 items-center justify-center rounded-full bg-white'
              >
                <MediaPreview
                  url={item.iconUrl}
                  className='h-5 w-5'
                  isIcon={true}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
