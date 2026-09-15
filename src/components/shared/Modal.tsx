import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';

import { ModalProps } from '@/types/components';

import { cn } from '@/lib/utils';

export const Modal = ({
  onClose,
  trigger,
  className,
  toggle,
  header,
  isOpen,
  children,
  forceModal,
  footer,
  headerClassName,
  footerClassName,
  closeOnClickOutside = false,
}: ModalProps) => {
  const handleOpenChange = (val: boolean) => {
    toggle?.(val);
    if (!val) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={isOpen}
      modal={forceModal}
      onOpenChange={handleOpenChange}
    >
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent
        forceMount
        className={cn(
          'flex max-h-[95%] max-w-[90%] flex-col !overflow-hidden rounded-xl bg-grayish-50 p-0',
          '[&>button>svg]:size-6 [&>button>svg]:text-grayish-900 [&>button]:!end-4 [&>button]:right-auto',
          {
            '[&>button]:hidden': !onClose,
          },
          className,
        )}
        onInteractOutside={(e) => !closeOnClickOutside && e.preventDefault()}
      >
        {header && (
          <DialogHeader
            className={cn(
              'flex-row [&+button>svg]:max-sm:size-6 [&+button]:end-4',
              {
                '[&+button]:hidden': onClose === undefined,
              },
              headerClassName,
            )}
          >
            {header}
          </DialogHeader>
        )}
        <div
          id='modal-content'
          className='min-h-0 w-full min-w-fit max-w-full flex-1 basis-auto overflow-auto'
        >
          {children}
        </div>
        {footer && (
          <DialogFooter className={cn('', footerClassName)}>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
