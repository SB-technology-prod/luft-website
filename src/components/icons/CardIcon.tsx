import MasterCardIcon from './MasterCardIcon';
import VisaIcon from './VisaIcon';

type CardIconProps = {
  type: string;
  className?: string;
};

export default function CardIcon({ type, className }: CardIconProps) {
  const lowerType = type.toLowerCase();

  if (lowerType.includes('visa')) {
    return <VisaIcon className={className} />;
  }

  return <MasterCardIcon className={className} />;
}
