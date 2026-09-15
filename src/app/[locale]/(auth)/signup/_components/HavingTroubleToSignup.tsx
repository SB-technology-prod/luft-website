import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function HavingTroubleToSignup({
  onClick,
}: {
  onClick: () => void;
}) {
  const tCommon = useTranslations('common');
  const t = useTranslations('auth.signup');

  return (
    <div className='mx-auto flex w-fit flex-wrap items-center gap-2'>
      <p>{t('havingTrouble')}</p>
      <Button
        variant={'link'}
        onClick={onClick}
        type='button'
        className='p-0'
      >
        {tCommon('buttons.retrySignup')}
      </Button>
    </div>
  );
}
