import { cn } from '@/lib/utils';

type RichTextProps = {
  content: string;
  className?: string;
};

const RichText = ({ content, className = '' }: RichTextProps) => {
  return (
    <article
      className={cn('', className)}
      dangerouslySetInnerHTML={{ __html: content + '' }}
    />
  );
};
export default RichText;
