import { ComponentProps } from 'react';

import { Button } from '../ui/button';

import Spinner from './Spinner';

type SubmitButtonProps = ComponentProps<typeof Button> & {
  isSubmitting?: boolean;
};

export default function SubmitButton({
  children,
  isSubmitting,
  ...restProps
}: SubmitButtonProps) {
  return (
    <Button
      disabled={isSubmitting}
      {...restProps}
    >
      {isSubmitting ? (
        <Spinner className='size-5 border-grayish-200' />
      ) : (
        children
      )}
    </Button>
  );
}
