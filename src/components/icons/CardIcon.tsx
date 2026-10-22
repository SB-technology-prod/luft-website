import { CreditCard } from 'lucide-react';

import MasterCardIcon from './MasterCardIcon';
import VisaIcon from './VisaIcon';

type CardIconProps = {
  type?: string | null;
  className?: string;
};

export default function CardIcon({ type, className }: CardIconProps) {
  const lowerType = type?.toLowerCase() ?? '';

  if (lowerType.includes('visa')) {
    return <VisaIcon className={className} />;
  }

  if (lowerType.includes('mastercard') || lowerType.includes('master card')) {
    return <MasterCardIcon className={className} />;
  }

  return <CreditCard className={className} />;
}
