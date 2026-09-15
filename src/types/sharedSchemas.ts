import z from 'zod';

import { TFunction } from '@/constants';
import { NAME_REGEX, NOT_SPACES_ONLY } from '@/constants/regex';

export const nameSchema = (tRoot: TFunction) =>
  z
    .string()
    .min(1, tRoot('common.validations.required'))
    .regex(NOT_SPACES_ONLY, tRoot('common.validations.required'))
    .regex(NAME_REGEX, tRoot('common.validations.lettersOnly'));
