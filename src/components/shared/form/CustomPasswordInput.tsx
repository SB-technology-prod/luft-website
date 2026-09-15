import React, { ComponentProps, useState } from 'react';

import EyeIcon from '@/components/icons/EyeIcon';
import EyeSlashIcon from '@/components/icons/EyeSlashIcon';

import CustomInput from './CustomInput';
import CustomInputWithIcon from './CustomInputWithIcon';

type CustomPasswordInputProps = Omit<
  ComponentProps<typeof CustomInput>,
  'type'
>;

export default function CustomPasswordInput(props: CustomPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const ShowPasswordIcon = showPassword ? EyeSlashIcon : EyeIcon;

  return (
    <CustomInputWithIcon
      {...props}
      showAllErrors={true}
      type={showPassword ? 'text' : 'password'}
      icon={
        <button
          type='button'
          onClick={() => setShowPassword((show) => !show)}
          tabIndex={-1}
        >
          <ShowPasswordIcon className='size-5' />
        </button>
      }
      iconAlign='inline-end'
    />
  );
}
