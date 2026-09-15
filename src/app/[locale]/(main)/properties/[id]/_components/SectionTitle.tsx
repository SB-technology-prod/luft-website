import { cn } from '@/lib/utils';

export default function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        'text-2xl font-medium text-grayish-900 md:text-[1.75rem] md:leading-9 xl:text-[2rem] xl:leading-10',
        className,
      )}
    >
      {children}
    </h4>
  );
}
