'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import FormServerError from '@/components/shared/FormServerError';
import LoadingError from '@/components/shared/LoadingError';
import SubmitButton from '@/components/shared/SubmitButton';
import { Form } from '@/components/ui/form';

import { updateUserCookieAction } from '../../actions';
import EditableField from '../EditableField';
import ProfileImgInput from '../ProfileImgInput';

import ChangeEmailForm from './ChangeEmail/ChangeEmailForm';
import ChangePhoneForm from './ChangePhone/ChangePhoneForm';
import ChangePasswordForm from './ChangePasswordForm';
import { profileFormQueryKey, profileFormSchema } from './schemas';

import useSession from '@/hooks/useSession';

import { UserSession } from '@/types/session';
import { GetUserProfileRes, ProfileFormData } from '@/types/settings';

import { updateSession } from '@/utils/events';

import { getProfileData, updateUserProfile } from '@/api/settings';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProfileForm() {
  const tCommon = useTranslations('common');
  const tRoot = useTranslations('');

  const [serverError, setServerError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (serverError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [serverError]);

  const session = useSession() as UserSession;

  const form = useForm<z.infer<ReturnType<typeof profileFormSchema>>>({
    resolver: zodResolver(profileFormSchema(tRoot)),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      file: null,
      password: '********',
    },
    reValidateMode: 'onChange',
    mode: 'onTouched',
  });

  const { isFetching, isFetched, data, isLoading, isError } =
    useQuery<GetUserProfileRes>({
      queryKey: [profileFormQueryKey],
      queryFn: () => getProfileData(),
    });

  const userData = data?.result;

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: ProfileFormData) => updateUserProfile(values),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [profileFormQueryKey] });
      toast.success(tCommon('toaster.dataUpdatedSuccess'));
      form.reset({ ...variables, file: null });
      updateSession({
        ...session,
        user: {
          ...session.user,
          name: `${variables.firstName} ${variables.lastName}`,
          profilePicture: data.result,
        },
      });

      updateUserCookieAction({
        name: `${variables.firstName} ${variables.lastName}`,
        profilePicture: data.result,
      });
    },
    onError: (error: Error) => {
      console.log(error);
      setServerError(error.message);
    },
  });

  useEffect(() => {
    if (isLoading) return;
    form.reset({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      password: '********',
      file: null,
    });
  }, [form, isFetched, userData, isLoading]);

  const isFormValid = form.formState.isValid;
  const isFormDirty = form.formState.isDirty;

  if (isError) return <LoadingError />;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(async (values) => {
          await mutateAsync(values);
        })}
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-6 sm:gap-8 md:gap-12'>
          <ProfileImgInput
            isLoading={isFetching || isPending}
            image={userData?.profilePicture}
            className='w-fit max-sm:mx-auto'
          />

          <div className='flex w-full flex-wrap gap-6'>
            <CustomInput
              formItemClassName='flex-1 max-sm:min-w-full'
              disabled={isPending || isFetching}
              required
              fieldName='firstName'
              label={tCommon('labels.firstName')}
              placeholder={
                isFetching
                  ? tCommon('loading')
                  : tCommon('placeholders.firstName')
              }
            />
            <CustomInput
              formItemClassName='flex-1 max-sm:min-w-full'
              disabled={isPending || isFetching}
              required
              fieldName='lastName'
              label={tCommon('labels.lastName')}
              placeholder={
                isFetching
                  ? tCommon('loading')
                  : tCommon('placeholders.lastName')
              }
            />
          </div>
        </div>
        <EditableField
          formTitle={tRoot('settings.titles.changeEmail')}
          editForm={<ChangeEmailForm />}
          fieldName='email'
          label={tCommon('labels.email')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.email')
          }
        />
        <EditableField
          formTitle={tRoot('settings.titles.changePhone')}
          editForm={<ChangePhoneForm />}
          fieldName='phoneNumber'
          label={tCommon('labels.phone')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.phone')
          }
        />
        <EditableField
          formTitle={tRoot('settings.titles.changePassword')}
          editForm={<ChangePasswordForm />}
          fieldName='password'
          label={tCommon('labels.password')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.password')
          }
        />

        {serverError && (
          <div ref={errorRef}>
            <FormServerError>{serverError}</FormServerError>
          </div>
        )}

        <SubmitButton
          isSubmitting={isPending}
          disabled={!isFormValid || !isFormDirty || isPending}
          className='mt-4 w-[11.5rem] self-end max-sm:w-full md:mt-8'
        >
          {tCommon('buttons.save')}
        </SubmitButton>
      </form>
    </Form>
  );
}
