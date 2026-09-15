import { useEffect, useState } from 'react';

type CountdownProps = {
  minutes: number;
  onFinish?: () => void;
};

export function Countdown({ minutes, onFinish }: CountdownProps) {
  const [remaining, setRemaining] = useState(minutes * 60);

  useEffect(() => {
    if (remaining <= 0) {
      onFinish?.();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onFinish]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <span>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  );
}
