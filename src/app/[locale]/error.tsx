'use client';

import Link from 'next/link';

import { Bird } from 'lucide-react';

import { Button } from '@/components/ui/button';

const Error = () => {
  return (
    <section>
      <div className='container mx-auto flex h-screen flex-col items-center justify-center gap-4'>
        <Bird className='size-48 text-primary-500' />
        <h1 className='text-4xl font-bold'>Something went wrong!</h1>
        <p className='text-2xl text-muted-foreground'>Please try again later</p>

        <Button asChild>
          <Link href='/'>Go back to home</Link>
        </Button>
      </div>
    </section>
  );
};

export default Error;
