'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { EditIcon, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import UserImg from '@/components/shared/UserImg';
import { FormField, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';

import FileUploaderButton from './FileUploaderButton';

import { ProfileFormData } from '@/types/settings';

import { cn } from '@/lib/utils';

type ProfileImgInputProps = {
  image: string | undefined;
  className?: string;
  isLoading: boolean;
};

export default function ProfileImgInput({
  image,
  isLoading,
  className,
}: ProfileImgInputProps) {
  const t = useTranslations('common.buttons');
  const tCommon = useTranslations('common');
  const { watch, setValue, setError, clearErrors } =
    useFormContext<ProfileFormData>();
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');

  const file = watch('file');

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUploadedImgUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setUploadedImgUrl('');
    }
  }, [file]);

  const previewImage = uploadedImgUrl || image;

  return (
    <FormField
      name='file'
      render={(field) => {
        return (
          <div className='flex flex-col gap-2'>
            <div className={cn('relative', className)}>
              {isLoading ? (
                <Skeleton className='size-[7.5rem] rounded-full' />
              ) : previewImage ? (
                <img
                  src={previewImage}
                  className='size-[7.5rem] rounded-full border border-grayish-50 object-cover'
                />
              ) : (
                <UserImg className='flex size-[7.5rem] text-6xl' />
              )}
              <FileUploaderButton
                fieldName='file'
                disabled={isLoading}
                onFileSelect={(file) => {
                  clearErrors('file');

                  const objectUrl = URL.createObjectURL(file);
                  const img = new Image();

                  img.onload = () => {
                    setValue('file', file, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    URL.revokeObjectURL(objectUrl);
                  };

                  img.onerror = () => {
                    setError('file', {
                      type: 'manual',
                      message: tCommon('corruptedFile'),
                    });
                    URL.revokeObjectURL(objectUrl);
                  };

                  img.src = objectUrl;
                }}
                className='mx-auto -mt-2.5'
                buttonText={image ? t('edit') : t('add')}
                buttonIcon={
                  image ? (
                    <EditIcon className='size-5 text-grayish-900' />
                  ) : (
                    <Plus className='size-5 text-grayish-900' />
                  )
                }
              />
            </div>
            <FormMessage className='ms-4 text-error-500' />
          </div>
        );
      }}
    ></FormField>
  );
}
