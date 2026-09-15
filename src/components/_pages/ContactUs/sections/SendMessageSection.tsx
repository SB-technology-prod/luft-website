'use client';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomTextarea from '@/components/shared/form/CustomTextarea';
import SubmitButton from '@/components/shared/SubmitButton';
import { Form } from '@/components/ui/form';

import { nameSchema } from '@/types/sharedSchemas';

import { EGYPTIAN_PHONE, NOT_SPACES_ONLY } from '@/constants/regex';

import { sendMessage } from '@/api/page';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SendMessageSection() {
  const tCommon = useTranslations('common');
  const tRoot = useTranslations();
  const tSendMessage = useTranslations('sections.sendMessage');

  const formSchema = z.object({
    firstName: nameSchema(tRoot)
      .min(2, tCommon('validations.firstName.min', { min: 2 }))
      .max(50, tCommon('validations.firstName.max', { max: 50 })),
    lastName: nameSchema(tRoot)
      .min(2, tCommon('validations.lastName.min', { min: 2 }))
      .max(50, tCommon('validations.lastName.max', { max: 50 })),

    emailAddress: z
      .string({ required_error: tCommon('validations.required') })
      .min(1, { message: tCommon('validations.required') })
      .email({ message: tCommon('validations.email.invalid') }),
    phoneNumber: z
      .string({ required_error: tCommon('validations.required') })
      .regex(NOT_SPACES_ONLY, tCommon('validations.required'))
      .min(1, { message: tCommon('validations.required') })
      .regex(EGYPTIAN_PHONE, { message: tCommon('validations.phone.invalid') }),

    message: z
      .string({ required_error: tCommon('validations.required') })
      .min(1, { message: tCommon('validations.required') })
      .regex(NOT_SPACES_ONLY, tCommon('validations.required'))
      .min(10, { message: tSendMessage('validations.min') })
      .max(2000, { message: tSendMessage('validations.max', { max: 2000 }) }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      message: '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast.success(tSendMessage('toast.success'));
      form.reset();
    },
    onError: (error) => {
      toast.error(error?.message || tSendMessage('toast.error'));
    },
  });

  return (
    <div className='flex flex-col gap-6 md:gap-8 lg:gap-12'>
      <h4 className='text-[1.75rem] font-medium leading-9 text-grayish-900'>
        {tSendMessage('title')}
      </h4>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            await mutateAsync(values);
          })}
        >
          <div className='flex flex-col gap-8 max-sm:gap-6'>
            <div className='grid grid-cols-2 gap-x-4 gap-y-4 lg:gap-x-6'>
              <CustomInput
                formItemClassName='max-md:col-span-2'
                disabled={isPending}
                required
                fieldName='firstName'
                label={tCommon('labels.firstName')}
                type='firstName'
                placeholder={tCommon('placeholders.firstName')}
              />
              <CustomInput
                formItemClassName='max-md:col-span-2'
                disabled={isPending}
                required
                fieldName='lastName'
                label={tCommon('labels.lastName')}
                type='lastName'
                placeholder={tCommon('placeholders.lastName')}
              />
              <CustomInput
                formItemClassName='max-xl:col-span-2'
                disabled={isPending}
                required
                fieldName='emailAddress'
                label={tCommon('labels.email')}
                type='email'
                placeholder={tCommon('placeholders.email')}
              />
              <CustomInput
                formItemClassName='max-xl:col-span-2'
                disabled={isPending}
                required
                fieldName='phoneNumber'
                label={tCommon('labels.phone')}
                type='phone'
                placeholder={tCommon('placeholders.phone')}
              />
              <CustomTextarea
                disabled={isPending}
                required
                fieldName='message'
                label={tCommon('labels.message')}
                placeholder=''
                formItemClassName='col-span-2'
                className='h-36 min-h-[auto] md:h-24 lg:h-36'
              />
            </div>
            <SubmitButton
              isSubmitting={isPending}
              className='h-14 text-base'
            >
              {tSendMessage('buttons.send')}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
