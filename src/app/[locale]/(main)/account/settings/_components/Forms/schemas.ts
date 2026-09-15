import z from 'zod';

import { nameSchema } from '@/types/sharedSchemas';

import { TFunction } from '@/constants';
import {
  ALLOWED_ICON_TYPES,
  MAX_IMAGE_SIZE,
  MAX_IMAGE_SIZE_MB,
} from '@/constants/media';

export const profileFormQueryKey = 'user-profile';
export const profileFormSchema = (tRoot: TFunction) =>
  z.object({
    firstName: nameSchema(tRoot)
      .trim()
      .min(2, tRoot('common.validations.firstName.min', { min: 2 }))
      .max(50, tRoot('common.validations.firstName.max', { max: 50 })),
    lastName: nameSchema(tRoot)
      .trim()
      .min(2, tRoot('common.validations.lastName.min', { min: 2 }))
      .max(50, tRoot('common.validations.lastName.max', { max: 50 })),
    email: z.string().email().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    password: z.string().nullable().optional(),
    file: z
      .instanceof(File)
      .superRefine((file, ctx) => {
        const isAllowedType = ALLOWED_ICON_TYPES.includes(file?.type ?? '');
        if (!isAllowedType) {
          return ctx.addIssue({
            code: 'custom',
            message: tRoot('common.validations.media.notAllowedType'),
          });
        }

        const fileSize = file?.size ?? 0;
        const isBigFile = fileSize > MAX_IMAGE_SIZE;

        if (isBigFile) {
          return ctx.addIssue({
            code: 'custom',
            message: tRoot('common.validations.media.fileSizeMax', {
              size: MAX_IMAGE_SIZE_MB,
            }),
          });
        }
      })
      .nullable(),
  });
