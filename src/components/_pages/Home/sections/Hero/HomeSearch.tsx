'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function HomeSearch() {
  const t = useTranslations('sections.homeSearch');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const cities = [
    { value: '', label: t('cities.placeholder') },
    { value: 'new-york', label: t('cities.newYork') },
    { value: 'los-angeles', label: t('cities.losAngeles') },
    { value: 'chicago', label: t('cities.chicago') },
    { value: 'miami', label: t('cities.miami') },
    { value: 'san-francisco', label: t('cities.sanFrancisco') },
  ];

  const dates = [
    { value: '', label: t('dates.placeholder') },
    { value: 'today', label: t('dates.today') },
    { value: 'tomorrow', label: t('dates.tomorrow') },
    { value: 'this-week', label: t('dates.thisWeek') },
    { value: 'next-week', label: t('dates.nextWeek') },
    { value: 'this-month', label: t('dates.thisMonth') },
  ];

  const guests = [
    { value: '', label: t('guestCounts.placeholder') },
    { value: '1', label: t('guestCounts.one') },
    { value: '2', label: t('guestCounts.two') },
    { value: '3', label: t('guestCounts.three') },
    { value: '4', label: t('guestCounts.four') },
    { value: '5+', label: t('guestCounts.fivePlus') },
  ];

  return (
    <div className='mx-auto w-full space-y-6'>
      {/* Tabs */}
      <div className='flex items-center gap-2'>
        <button className='flex h-10 items-center gap-2 rounded-full border border-grayish-50 bg-white px-5 text-sm font-medium text-grayish-900'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.55861 3.20081C9.6758 3.08376 9.83465 3.01802 10.0003 3.01802C10.1659 3.01802 10.3248 3.08376 10.4419 3.20081L17.6836 10.4425C17.7413 10.5021 17.8103 10.5497 17.8865 10.5824C17.9628 10.6152 18.0448 10.6324 18.1278 10.633C18.2108 10.6337 18.2931 10.6179 18.3699 10.5864C18.4467 10.5549 18.5165 10.5085 18.5751 10.4498C18.6338 10.3911 18.6801 10.3213 18.7115 10.2445C18.7429 10.1676 18.7587 10.0853 18.7579 10.0023C18.7572 9.91935 18.7399 9.83735 18.7071 9.76111C18.6743 9.68488 18.6267 9.61593 18.5669 9.55831L11.3261 2.31664C11.152 2.14253 10.9453 2.00441 10.7178 1.91018C10.4903 1.81596 10.2465 1.76746 10.0003 1.76746C9.75405 1.76746 9.51023 1.81596 9.28274 1.91018C9.05525 2.00441 8.84855 2.14253 8.67444 2.31664L1.43278 9.55831C1.37311 9.61599 1.32553 9.68498 1.29281 9.76124C1.26009 9.83751 1.24289 9.91953 1.24221 10.0025C1.24153 10.0855 1.25738 10.1678 1.28884 10.2446C1.3203 10.3214 1.36674 10.3911 1.42545 10.4498C1.48416 10.5085 1.55397 10.5548 1.63079 10.5862C1.70762 10.6176 1.78992 10.6334 1.87291 10.6326C1.9559 10.6319 2.0379 10.6146 2.11414 10.5818C2.19038 10.549 2.25932 10.5014 2.31694 10.4416L9.55861 3.20081Z'
              fill='#1B1B1B'
            />
            <path
              d='M10 4.52661L16.7992 11.3258C16.8242 11.3508 16.8492 11.3741 16.875 11.3974V16.5624C16.875 17.4249 16.175 18.1249 15.3125 18.1249H12.5C12.3342 18.1249 12.1753 18.0591 12.0581 17.9419C11.9408 17.8247 11.875 17.6657 11.875 17.4999V13.7499C11.875 13.5842 11.8092 13.4252 11.6919 13.308C11.5747 13.1908 11.4158 13.1249 11.25 13.1249H8.75C8.58424 13.1249 8.42527 13.1908 8.30806 13.308C8.19085 13.4252 8.125 13.5842 8.125 13.7499V17.4999C8.125 17.6657 8.05915 17.8247 7.94194 17.9419C7.82473 18.0591 7.66576 18.1249 7.5 18.1249H4.6875C4.2731 18.1249 3.87567 17.9603 3.58265 17.6673C3.28962 17.3743 3.125 16.9768 3.125 16.5624V11.3974C3.15093 11.3743 3.17621 11.3504 3.20083 11.3258L10 4.52661Z'
              fill='#1B1B1B'
            />
          </svg>
          {t('tabs.stays')}
        </button>
        <button className='flex h-10 items-center gap-2 px-5 text-sm font-medium text-grayish-400 transition-colors hover:text-grayish-900'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.3809 1.27435C17.9838 0.878 17.4457 0.655396 16.8846 0.655396C16.3236 0.655396 15.7854 0.878 15.3883 1.27435C14.9511 1.7116 13.1958 3.89006 12.0616 5.69084L12.3622 5.88006L13.7748 7.29305L13.964 7.59324C15.766 6.45826 17.9441 4.7042 18.3805 4.26696C18.7771 3.87 18.9999 3.33186 19 2.77073C19.0001 2.20961 18.7774 1.67141 18.3809 1.27435ZM12.5004 7.04502C11.7517 6.2959 10.8165 5.53003 9.56235 5.53003C8.67306 5.53003 7.72925 5.92484 6.75664 6.70434C4.98 8.12666 3.50822 8.66748 2.80855 8.86099L2.80154 8.85398C2.35378 8.40622 1.63191 8.34003 1.2554 8.71693C0.866819 9.10512 0.928727 9.79895 1.39284 10.2631L9.28279 18.153C9.53354 18.4038 9.8606 18.547 10.1814 18.547C10.433 18.547 10.6631 18.4559 10.8293 18.2905C11.2175 17.9019 11.156 17.208 10.6915 16.7439L10.6853 16.7369C10.8784 16.0372 11.4188 14.5655 12.8419 12.7888C15.245 9.78883 13.3216 7.86618 12.5004 7.04502ZM8.19337 18.0105L3.74573 13.506L3.50355 13.2467C3.15085 13.5764 2.8694 13.9747 2.67655 14.4173C2.48369 14.8599 2.38352 15.3372 2.3822 15.82C2.3822 17.7633 3.96338 19.3445 5.90628 19.3445C6.382 19.3458 6.85299 19.25 7.29034 19.0627C7.72768 18.8755 8.12216 18.6009 8.44956 18.2558L8.19337 18.0105Z'
              fill='#2E2C2A'
            />
          </svg>
          {t('tabs.services')}
        </button>
      </div>

      {/* Desktop Search Bar */}
      <div className='hidden items-center rounded-full bg-white p-2 ps-6 shadow-[0_2px_16px_rgba(0,0,0,0.08)] md:flex'>
        <div className='flex flex-1 items-center'>
          {/* City */}
          <div className='relative flex-1 pe-4'>
            <p className='text-sm font-semibold text-grayish-900'>
              {t('fields.city.label')}
            </p>
            <div className='relative'>
              <select
                disabled
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='w-full cursor-pointer appearance-none bg-transparent text-sm text-grayish-400 focus:outline-none'
              >
                {cities.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className='h-10 w-px bg-grayish-50' />

          {/* Date */}
          <div className='relative flex-1 px-4'>
            <p className='text-sm font-semibold text-grayish-900'>
              {t('fields.date.label')}
            </p>
            <div className='relative'>
              <select
                disabled
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='w-full cursor-pointer appearance-none bg-transparent text-sm text-grayish-400 focus:outline-none'
              >
                {dates.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className='h-10 w-px bg-grayish-50' />

          {/* Guests */}
          <div className='relative flex-1 px-4'>
            <p className='text-sm font-semibold text-grayish-900'>
              {t('fields.guests.label')}
            </p>
            <div className='relative'>
              <select
                disabled
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className='w-full cursor-pointer appearance-none bg-transparent text-sm text-grayish-400 focus:outline-none'
              >
                {guests.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className='flex h-12 w-12 items-center justify-center rounded-full bg-grayish-900 transition-colors hover:bg-grayish-800'>
          <Search className='h-5 w-5 text-white' />
        </button>
      </div>

      {/* Mobile Search Cards */}
      <div className='flex flex-col gap-4 md:hidden'>
        {/* City Card */}
        <div className='rounded-full bg-white px-6 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.08)]'>
          <p className='text-sm font-semibold text-grayish-900'>
            {t('fields.city.label')}
          </p>
          <div className='relative'>
            <select
              disabled
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='w-full cursor-pointer appearance-none bg-transparent pe-4 text-sm text-grayish-400 focus:outline-none'
            >
              {cities.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Card */}
        <div className='rounded-full bg-white px-6 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.08)]'>
          <p className='text-sm font-semibold text-grayish-900'>
            {t('fields.date.label')}
          </p>
          <div className='relative'>
            <select
              disabled
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full cursor-pointer appearance-none bg-transparent pe-4 text-sm text-grayish-400 focus:outline-none'
            >
              {dates.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guests Card */}
        <div className='rounded-full bg-white px-6 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.08)]'>
          <p className='text-sm font-semibold text-grayish-900'>
            {t('fields.guests.label')}
          </p>
          <div className='relative'>
            <select
              disabled
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className='w-full cursor-pointer appearance-none bg-transparent pe-4 text-sm text-grayish-400 focus:outline-none'
            >
              {guests.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button className='mt-2 h-10'>{t('buttons.search')}</Button>
      </div>
    </div>
  );
}
