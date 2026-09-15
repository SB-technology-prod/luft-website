import { getTranslations } from 'next-intl/server';

import StatusLayout from '@/components/shared/StatusLayout';

const NotFound = async () => {
  const t = await getTranslations('emptyStates.notFound');

  return (
    <StatusLayout
      title={t('title')}
      paragraph={t('description')}
      mainImageSrc='/svg/notFound.svg'
    />
  );
};

export default NotFound;
