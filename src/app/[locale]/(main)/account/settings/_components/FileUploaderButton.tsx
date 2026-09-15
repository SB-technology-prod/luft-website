'use client';

import { ReactNode, useRef } from 'react';

import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FileUploaderButtonProps {
  onFileSelect: (file: File) => void;
  accept?: string; // default to images
  buttonText?: string;
  buttonIcon?: ReactNode;
  className?: string;
  fieldName: string;
  disabled?: boolean;
}

export default function FileUploaderButton({
  onFileSelect,
  accept = 'image/*',
  buttonText = 'Upload Image',
  buttonIcon = <Plus className='size-5 text-grayish-900' />,
  className = '',
  fieldName,
  disabled,
}: FileUploaderButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      e.target.value = '';
    }
  };

  return (
    <>
      {
        <button
          type='button'
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            'relative z-50 flex h-8 w-[5.5rem] items-center justify-center gap-1 rounded-full bg-white text-grayish-900 shadow-sm shadow-grayish-50',
            className,
          )}
        >
          {buttonIcon}
          <span>{buttonText}</span>
        </button>
      }
      <input
        ref={inputRef}
        name={fieldName}
        type='file'
        accept={accept}
        className='hidden'
        onChange={handleChange}
      />
    </>
  );
}
