import { ReactNode } from 'react';

import FacebookIcon from '@/components/icons/FacebookIcon';
import InstgramIcon from '@/components/icons/InstgramIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import XIcon from '@/components/icons/XIcon';

type SocialLink = {
  icon: ReactNode;
  link: string;
};

export const socialLinks: SocialLink[] = [
  {
    icon: <InstgramIcon />,
    link: '',
  },
  {
    icon: <FacebookIcon />,
    link: '',
  },
  {
    icon: <LinkedInIcon />,
    link: '',
  },
  {
    icon: <XIcon />,
    link: '',
  },
];
