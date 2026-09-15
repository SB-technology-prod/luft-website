import { ReactNode } from 'react';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type AccordionProps = {
  value: string;
  trigger: ReactNode;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
};

export default function AccordionElement({
  value,
  trigger,
  openIcon,
  closeIcon,
  children,
  className,
  triggerClassName,
}: AccordionProps) {
  return (
    <AccordionItem
      value={value}
      className={className}
    >
      <AccordionTrigger
        openIcon={openIcon}
        closeIcon={closeIcon}
        className={triggerClassName}
      >
        {trigger}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
