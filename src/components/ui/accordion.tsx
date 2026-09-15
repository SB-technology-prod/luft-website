'use client';

import * as React from 'react';

import { ChevronDown } from 'lucide-react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  {
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, openIcon, closeIcon, ...props }, ref) => {
  const hasCustomIcons = openIcon && closeIcon;

  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'group/accordion flex flex-1 items-center justify-between text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        {hasCustomIcons ? (
          <>
            {/* Closed icon */}
            <span className='transition-all group-data-[state=open]/accordion:hidden'>
              {closeIcon}
            </span>

            {/* Open icon */}
            <span className='hidden transition-all group-data-[state=open]/accordion:block'>
              {openIcon}
            </span>
          </>
        ) : (
          <ChevronDown className='h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
