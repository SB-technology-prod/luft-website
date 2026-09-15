import { ReactNode } from 'react';

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectOption } from '@/types/components';

import { cn } from '@/lib/utils';

type SelectProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  labelIcon?: ReactNode;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
};

export default function Select({
  value,
  placeholder,
  className,
  disabled,
  label,
  labelIcon,
  options,
  onChange,
}: SelectProps) {
  return (
    <div className='flex flex-col gap-2.5'>
      {label && (
        <div className='ms-2.5 flex items-center gap-1.5'>
          {labelIcon}
          <span className='text-grayish-900'>{label}</span>
        </div>
      )}
      <SelectUI
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'h-12 rounded-2xl border-[1.5px] border-grayish-100 px-4 py-3 text-grayish-900 outline-none transition-all placeholder:text-grayish-400 hover:border-grayish-300 focus-visible:border-grayish-900 focus-visible:ring-0 disabled:border-grayish-100 disabled:bg-grayish-50',
            { 'text-grayish-400': !value },
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position={'popper'}>
          <SelectGroup>
            {options.map(({ label, value }) => (
              <SelectItem
                key={`Select-${label}`}
                value={value}
              >
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUI>
    </div>
  );
}
