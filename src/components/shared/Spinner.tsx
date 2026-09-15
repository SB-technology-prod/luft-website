import { cn } from '@/lib/utils';

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'size-6 animate-spin rounded-full border-4 border-grayish-900',
        className,
        'border-t-transparent',
      )}
    />
  );
};

export default Spinner;
