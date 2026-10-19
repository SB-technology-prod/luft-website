const paths = {
  guest:
    'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-9 9a9 9 0 0 1 18 0 20 20 0 0 1-18 0Z',
  guests:
    'M9 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm9 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM1 21a8 8 0 0 1 16 0 18 18 0 0 1-16 0Zm17.5.4a10 10 0 0 0-2.6-7.5A6 6 0 0 1 24 19.5a11 11 0 0 1-5.5 1.9Z',
};

export default function ReservationSummaryIcon({
  name,
}: {
  name: keyof typeof paths;
}) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-[22px] shrink-0'
      aria-hidden='true'
    >
      <path d={paths[name]} />
    </svg>
  );
}
