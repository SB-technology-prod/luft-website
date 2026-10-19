import { cn } from '@/lib/utils';

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'size-6 animate-spin rounded-full border-4 border-grayish-900',
        className,
        'border-t-transparent',
      )}
    />
  );
}
