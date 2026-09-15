import useSession from '@/hooks/useSession';

import { getTextLocale } from '@/utils/language';

import { cn } from '@/lib/utils';

type UserImgProps = {
  className?: string;
};

export default function UserImg({ className }: UserImgProps) {
  const session = useSession();

  const userName = session?.user?.name ?? '';
  const profilePicture = session?.user?.profilePicture ?? '';

  const firstName = userName?.split(' ')[0];
  const lastName = userName?.split(' ')[1];
  const firstNameLetter = firstName?.[0];
  const lastNameLetter = lastName?.[0];

  const textLocale = getTextLocale(userName);
  const isArabicName = textLocale === 'ar';

  return (
    <div
      dir='ltr'
      className={cn(
        'flex size-10 items-center justify-center gap-px overflow-hidden rounded-full border border-grayish-50 text-xl font-medium',
        {
          'bg-grayish-900 p-2 text-grayish-50': !profilePicture,
        },
        className,
      )}
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt='Profile'
          className='size-full object-cover'
        />
      ) : (
        <>
          {firstNameLetter?.toUpperCase()}
          {isArabicName && <>&nbsp;</>}
          {lastNameLetter?.toUpperCase()}
        </>
      )}
    </div>
  );
}
