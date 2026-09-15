import { cn } from '@/lib/utils';

type ContactItemProps = {
  label: string;
  value: string;
  className?: string;
};

export default function ContactItem({
  label,
  value,
  className,
}: ContactItemProps) {
  return (
    <div className={cn('flex flex-col gap-2 overflow-hidden', className)}>
      <h5
        title={label}
        className='line-clamp-1 text-sm leading-6'
      >
        {label}
      </h5>
      <p
        title={value}
        className='line-clamp-1 sm:text-lg'
      >
        {value}
      </p>
    </div>
  );
}
