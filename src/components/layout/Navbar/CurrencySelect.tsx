'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import DollarIcon from '@/components/icons/DollarIcon';
import Dropdown from '@/components/shared/Dropdown';
import Select from '@/components/shared/Select';

type CurrencySelectProps = {
  variant?: 'desktop' | 'mobile';
};

export default function CurrencySelect({
  variant = 'desktop',
}: CurrencySelectProps) {
  const t = useTranslations('common');
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currency') || 'EGP';
    }
    return 'EGP';
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currency' && e.newValue) {
        setValue(e.newValue);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setValue(customEvent.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('currency-change', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('currency-change', handleCustomChange);
    };
  }, []);

  // Fetch this from the api
  const currencyOptions = [
    { label: 'EGP', value: 'EGP' },
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
  ];

  const onCurrencyChange = (value: string) => {
    setValue(value);
    localStorage.setItem('currency', value);
    window.dispatchEvent(new CustomEvent('currency-change', { detail: value }));
  };

  if (variant === 'mobile') {
    return (
      <Select
        label={t('currency')}
        options={currencyOptions}
        onChange={onCurrencyChange}
        placeholder='EGP'
        value={value}
        labelIcon={<DollarIcon className='size-5' />}
      />
    );
  }

  return (
    <Dropdown
      items={currencyOptions.map((option) => ({
        ...option,
        onClick: () => onCurrencyChange(option.value),
      }))}
      trigger={<span className='text-grayish-900 underline'>{value}</span>}
      className='border-transparent bg-grayish-30 drop-shadow'
    />
  );
}
