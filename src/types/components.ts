import type { ReactNode } from 'react';

import { PageTypeEnum } from './page';
import { SetState } from '.';

import { Dir } from '@/i18n/i18n.config';

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  toggle?: (open: boolean) => void;
  trigger?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  forceModal?: boolean;
  headerClassName?: string;
  footerClassName?: string;
  closeOnClickOutside?: boolean;
};

export type DropDownItem = {
  label: string;
  icon?: ReactNode;
  iconAlign?: 'start' | 'end';
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export type DropdownProps = {
  items: DropDownItem[];
  align?: 'start' | 'end' | 'center';
  trigger: ReactNode;
  className?: string;
  triggerClassName?: string;
  itemClassName?: string;
  isOpen?: boolean;
  setIsopen?: SetState<boolean>;
  dir?: Dir;
};

export type NavLinkProps = {
  id: string;
  title: string;
  pageType: PageTypeEnum;
};

export type SelectOption = {
  label: string;
  value: string;
};
