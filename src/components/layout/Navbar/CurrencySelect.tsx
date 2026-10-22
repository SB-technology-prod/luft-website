'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import DollarIcon from '@/components/icons/DollarIcon';
import Dropdown from '@/components/shared/Dropdown';
import Select from '@/components/shared/Select';

// Only EGP is supported for now; flip this to re-enable switching currencies
const IS_CURRENCY_SELECTION_ENABLED = false;
const DEFAULT_CURRENCY = 'EGP';

type CurrencySelectProps = {
  variant?: 'desktop' | 'mobile';
};

export default function CurrencySelect({
  variant = 'desktop',
}: CurrencySelectProps) {
  const t = useTranslations('common');
  const [storedValue, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currency') || DEFAULT_CURRENCY;
    }
    return DEFAULT_CURRENCY;
  });
  const value = IS_CURRENCY_SELECTION_ENABLED ? storedValue : DEFAULT_CURRENCY;

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
  const currencyOptions = (['EGP', 'USD', 'EUR', 'GBP'] as const).map(
    (currency) => ({ label: t(`currencies.${currency}`), value: currency }),
  );

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
        placeholder={t(`currencies.${DEFAULT_CURRENCY}`)}
        value={value}
        disabled={!IS_CURRENCY_SELECTION_ENABLED}
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
      trigger={
        <span className='text-grayish-900'>
          {currencyOptions.find((option) => option.value === value)?.label ??
            value}
        </span>
      }
      className='border-transparent bg-grayish-30 drop-shadow'
      triggerClassName='disabled:cursor-default'
      disabled={!IS_CURRENCY_SELECTION_ENABLED}
    />
  );
}
