const paths = {
  guest:
    'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-9 9a9 9 0 0 1 18 0 20 20 0 0 1-18 0Z',
  phone:
    'M6.6 10.8a16.6 16.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.24 1l-2.23 2.2Z',
  email:
    'M3 4a2 2 0 0 0-2 2v.5l11 7 11-7V6a2 2 0 0 0-2-2H3Zm20 4.9-10.46 6.65a1 1 0 0 1-1.08 0L1 8.9V20a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8.9Z',
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
