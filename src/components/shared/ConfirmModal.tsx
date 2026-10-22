import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';

import { Modal } from './Modal';
import SubmitButton from './SubmitButton';

import { ModalProps } from '@/types/components';

import { cn } from '@/lib/utils';

type ConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isActionsDisabled?: boolean;
  variant?: 'default' | 'destructive';
  confirmLabel?: string;
};

export default function ConfirmModal({
  children,
  onConfirm,
  onCancel,
  isActionsDisabled,
  variant = 'default',
  confirmLabel,
  ...modalProps
}: ConfirmModalProps & ModalProps) {
  const t = useTranslations('common.buttons');

  return (
    <Modal
      {...modalProps}
      className={cn(
        'w-[calc(100vw-2rem)] min-w-0 max-w-[32.6875rem] gap-0 rounded-2xl bg-white p-4 shadow-[0_4px_12.5px_rgba(0,0,0,0.1)] sm:p-6',
        // align the close icon with the top row of the content
        'sm:[&>button]:!end-6 sm:[&>button]:top-6',
        modalProps.className,
      )}
      onClose={onCancel}
    >
      <div className='flex w-full min-w-0 flex-col items-center gap-6'>
        {/* reserves the row the close icon sits in */}
        <div
          className='h-6 w-full shrink-0'
          aria-hidden
        />
        <div className='w-full min-w-0 break-words text-center'>
          {children}
        </div>
        <div className='flex w-full items-center gap-2'>
          <SubmitButton
            className={cn('min-w-0 flex-1', {
              'bg-error-500 text-error-50 hover:bg-error-500/90':
                variant === 'destructive',
            })}
            disabled={isActionsDisabled}
            onClick={onConfirm}
            type='button'
            isSubmitting={isActionsDisabled}
            variant={variant}
          >
            {confirmLabel ?? t('confirm')}
          </SubmitButton>
          <Button
            className='min-w-0 flex-1 border-grayish-900 bg-transparent text-grayish-900 shadow-none'
            disabled={isActionsDisabled}
            variant='outline'
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
