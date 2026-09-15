type SocialMediaItemProps = {
  iconUrl: string;
  url: string;
};

export default function SocialMediaItem({
  iconUrl,
  url,
}: SocialMediaItemProps) {
  return (
    <a
      href={url}
      className='flex size-8 items-center justify-center rounded-full bg-white'
    >
      <img
        src={iconUrl}
        alt='icon'
        className='max-h-5 max-w-5'
      />
    </a>
  );
}
