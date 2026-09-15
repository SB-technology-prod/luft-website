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
};

export default function ConfirmModal({
  children,
  onConfirm,
  onCancel,
  isActionsDisabled,
  ...modalProps
}: ConfirmModalProps & ModalProps) {
  const t = useTranslations('common.buttons');

  return (
    <Modal
      {...modalProps}
      className={cn(
        'w-4/12 min-w-fit gap-0 p-6 max-sm:w-full',
        modalProps.className,
      )}
      onClose={onCancel}
    >
      <div className='flex w-full flex-col items-center gap-7'>
        <div>{children}</div>
        <div className='flex w-full items-center gap-3 py-1 max-sm:flex-col'>
          <SubmitButton
            className='w-24 min-w-fit flex-1 font-medium max-sm:w-full'
            disabled={isActionsDisabled}
            onClick={onConfirm}
            type='button'
            isSubmitting={isActionsDisabled}
          >
            {t('confirm')}
          </SubmitButton>
          <Button
            className='w-24 min-w-fit flex-1 font-medium max-sm:w-full'
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
