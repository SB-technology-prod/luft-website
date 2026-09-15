'use client';
import React from 'react';

import AppleIcon from './icons/AppleIcon';
import GoogleIcon from './icons/GoogleIcon';
import SocialBtn from './SocialBtn';

export default function SocialLogin() {
  return (
    <div className='flex items-center gap-2'>
      <SocialBtn
        label='Google'
        icon={<GoogleIcon className='!size-5' />}
        onClick={() => {}}
        className='flex-1'
      />
      <SocialBtn
        label='Apple'
        icon={<AppleIcon className='!size-5 group-hover:fill-white' />}
        onClick={() => {}}
        className='flex-1'
      />
    </div>
  );
}
