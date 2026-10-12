import MastercardIcon from './MastercardIcon';
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

  return <MastercardIcon className={className} />;
}
