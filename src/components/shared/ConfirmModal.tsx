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
};

export default function ConfirmModal({
  children,
  onConfirm,
  onCancel,
  isActionsDisabled,
  variant = 'default',
  ...modalProps
}: ConfirmModalProps & ModalProps) {
  const t = useTranslations('common.buttons');

  return (
    <Modal
      {...modalProps}
      className={cn(
        'w-[calc(100vw-2rem)] max-w-[28rem] min-w-0 gap-0 p-4 sm:p-6',
        modalProps.className,
      )}
      onClose={onCancel}
    >
      <div className='flex w-full min-w-0 flex-col items-center gap-7 overflow-hidden'>
        <div className='w-full min-w-0 overflow-hidden break-words text-center'>
          {children}
        </div>
        <div className='flex w-full items-center gap-3 py-1 max-sm:flex-col'>
          <SubmitButton
            className='min-w-0 flex-1 font-medium max-sm:w-full'
            disabled={isActionsDisabled}
            onClick={onConfirm}
            type='button'
            isSubmitting={isActionsDisabled}
            variant={variant}
          >
            {t('confirm')}
          </SubmitButton>
          <Button
            className='min-w-0 flex-1 font-medium max-sm:w-full'
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
